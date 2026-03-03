import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { sqlLevels, nosqlLevels } from '../../data/levels';

const SECTIONS = ['A', 'B', 'C'];

const normalizeSection = (value) => {
    const raw = String(value || '').trim().toUpperCase();
    if (!raw) return '';
    if (SECTIONS.includes(raw)) return raw;
    const match = raw.match(/([ABC])$/);
    return match ? match[1] : '';
};

const HodDashboard = ({ user, onLogout, theme, onToggleTheme }) => {
    const isStaff = user && user.role === 'STAFF';
    const isAdmin = user && user.role === 'ADMIN';
    const staffYear = isStaff ? Number.parseInt(String(user.year || ''), 10) : null;
    const defaultSection = isStaff ? normalizeSection(user.section || user.department_section) : 'ALL';
    const [section, setSection] = useState(defaultSection || 'ALL');
    const [yearFilter, setYearFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reportLoading, setReportLoading] = useState(false);
    const [error, setError] = useState('');

    const getToken = () => {
        try {
            const raw = localStorage.getItem('qa_auth');
            if (!raw) return '';
            const parsed = JSON.parse(raw);
            return parsed && parsed.token ? parsed.token : '';
        } catch {
            return '';
        }
    };

    const loadDashboard = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/hod/dashboard', {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            const payload = await res.json();
            if (!payload.success) {
                setError(payload.error || 'Failed to load dashboard');
                setData(null);
            } else {
                setData(payload.data);
            }
        } catch (e) {
            setError('Network error. Please try again.');
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const totalSqlQuestions = sqlLevels.reduce((acc, lvl) => acc + lvl.questions.length, 0);
    const totalNosqlQuestions = nosqlLevels.reduce((acc, lvl) => acc + lvl.questions.length, 0);
    const totalQuestions = totalSqlQuestions + totalNosqlQuestions;

    const getSqlCompleted = (student) => (student.sqlProgress && student.sqlProgress.completedQuestions
        ? student.sqlProgress.completedQuestions.length
        : 0);
    const getNosqlCompleted = (student) => (student.nosqlProgress && student.nosqlProgress.completedQuestions
        ? student.nosqlProgress.completedQuestions.length
        : 0);
    const getCompletedCount = (student) => getSqlCompleted(student) + getNosqlCompleted(student);

    const buildSummary = (students, sections) => {
        return sections.map(sec => {
            const sectionStudents = students.filter(s => (s.section || 'A') === sec);
            const count = sectionStudents.length;
            const totalCompleted = sectionStudents.reduce((sum, s) => sum + getCompletedCount(s), 0);
            const avgCompleted = count > 0 ? totalCompleted / count : 0;
            const completedStudents = sectionStudents.filter(s => getCompletedCount(s) > 0).length;
            const topStudent = sectionStudents
                .map(s => ({
                    ...s,
                    completedCount: getCompletedCount(s)
                }))
                .sort((a, b) => b.completedCount - a.completedCount)[0] || null;

            return {
                section: sec,
                avgCompleted,
                count,
                completedStudents,
                topStudent
            };
        });
    };

    const students = (data && data.students) || [];
    const normalizedStudents = students
        .map(s => ({
            ...s,
            section: normalizeSection(s.section || s.department_section || 'A')
        }))
        .filter(s => s.username && s.email);

    const availableYears = Array.from(
        new Set(
            normalizedStudents
                .map((s) => Number.parseInt(String(s.year || ''), 10))
                .filter((year) => Number.isFinite(year))
        )
    ).sort((a, b) => a - b);

    const yearFilteredStudents = normalizedStudents.filter((s) => {
        const sYear = Number.parseInt(String(s.year || ''), 10);

        if (isStaff && staffYear) return sYear === staffYear;
        if (!isStaff && yearFilter !== 'ALL') return sYear === Number(yearFilter);
        return true;
    });

    const sectionYearFilteredStudents = yearFilteredStudents.filter((s) => {
        if (section !== 'ALL' && s.section !== section) return false;
        return true;
    });

    const normalizedQuery = String(searchQuery || '').trim().toLowerCase();
    const displayedStudents = normalizedQuery
        ? sectionYearFilteredStudents.filter((s) => {
            const name = String(s.username || '').toLowerCase();
            const roll = String(s.roll_number || '').toLowerCase();
            return name.includes(normalizedQuery) || roll.includes(normalizedQuery);
        })
        : sectionYearFilteredStudents;

    const sectionsToShow = section !== 'ALL' ? [section] : SECTIONS;

        const summarySource = yearFilteredStudents;
        const summary = buildSummary(summarySource, sectionsToShow);

        const isLight = theme === 'light';
        const themeStyles = {
                pageBg: isLight ? '#f8fafc' : '#0b1120',
                navBg: isLight ? '#ffffff' : '#0b1120',
                navBorder: isLight ? '#e2e8f0' : '#1f2937',
                cardBg: isLight ? '#ffffff' : '#121826',
                cardBorder: isLight ? '#e2e8f0' : '#1f2937',
                textPrimary: isLight ? '#0f172a' : '#e2e8f0',
                textSecondary: isLight ? '#475569' : '#94a3b8'
        };

        const buildReportHtml = () => {
                const reportStudents = sectionYearFilteredStudents;
            const sectionLabel = isStaff ? (defaultSection || 'A') : (section === 'ALL' ? 'ALL' : section);
            const yearLabel = isStaff ? (staffYear || '-') : (yearFilter === 'ALL' ? '-' : yearFilter);
            const dateStr = new Date().toLocaleDateString('en-GB');

            // Use the already-computed total questions from the dashboard scope.
            const totalQuestionsForReport = totalQuestions;
            const totalStudents = reportStudents.length;
            const totalCompleted = reportStudents.reduce((sum, s) => sum + getCompletedCount(s), 0);
            const completedStudents = reportStudents.filter((s) => getCompletedCount(s) > 0).length;
            const certifiedStudents = reportStudents.filter((s) => getCompletedCount(s) >= totalQuestionsForReport).length;
            const incompleteStudents = totalStudents - completedStudents;
            const avgCompleted = totalStudents > 0 ? (totalCompleted / totalStudents).toFixed(1) : '0';

            return `
    <style>
      * { box-sizing: border-box; }
      .report-page { width: 794px; min-height: 1123px; padding: 48px; background: #ffffff; font-family: "Inter", Arial, sans-serif; color: #0f172a; }
      .report-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; gap: 24px; }
      .report-title { font-size: 30px; font-weight: 800; margin: 0 0 6px; }
      .report-subtitle { font-size: 18px; font-weight: 600; color: #2563eb; margin: 0 0 12px; }
      .report-meta { font-size: 18px; color: #475569; margin-bottom: 8px; }
      .report-meta-strong { font-size: 20px; font-weight: 700; color: #0f172a; }
            .report-summary { display: grid; grid-template-columns: 1fr; gap: 18px; margin-top: 16px; }
      .report-card { padding: 20px; border: 1px solid #e2e8f0; border-radius: 14px; background: #f8fafc; }
      .report-card h3 { margin: 0 0 8px; font-size: 18px; color: #475569; }
      .report-card .value { font-size: 24px; font-weight: 800; }
            .report-top { margin-top: 24px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 14px; background: #ffffff; }
            .report-top h3 { margin: 0 0 12px; font-size: 18px; color: #475569; }
            .report-top ul { margin: 0; padding-left: 18px; }
            .report-top li { margin-bottom: 8px; font-size: 16px; color: #0f172a; }
      .report-footer { margin-top: 28px; font-size: 15px; color: #64748b; }
    </style>
    <div class="report-page">
      <div class="report-header">
        <div>
          <div class="report-title">Performance Report</div>
          <div class="report-subtitle">DualDB Architect</div>
          <div class="report-meta report-meta-strong">Class Section: ${sectionLabel} | Year: ${yearLabel}</div>
                    <div class="report-meta report-meta-strong">Generated by: ${user.username}</div>
        </div>
        <div class="report-meta">Generated on: ${dateStr}</div>
      </div>

    <div class="report-summary">
        <div class="report-card">
          <h3>Total Students</h3>
          <div class="value">${totalStudents}</div>
        </div>

        <div class="report-top">
            <h3>Top 2 Students (Completed)</h3>
            <ul>
                ${reportStudents
                    .map((s) => ({
                        name: s.username,
                        completed: getCompletedCount(s)
                    }))
                    .sort((a, b) => b.completed - a.completed)
                    .slice(0, 2)
                    .map((s) => `<li>${s.name} - Completed: ${s.completed} / ${totalQuestionsForReport}</li>`)
                    .join('') || '<li>No data</li>'}
            </ul>
        </div>
        <div class="report-card">
            <h3>Avg Completed</h3>
            <div class="value">${avgCompleted} / ${totalQuestionsForReport}</div>
        </div>
        <div class="report-card">
          <h3>Completed Students</h3>
          <div class="value">${completedStudents}</div>
        </div>
        <div class="report-card">
            <h3>Certificate Achieved</h3>
            <div class="value">${certifiedStudents}</div>
        </div>
        <div class="report-card">
          <h3>Incomplete</h3>
          <div class="value">${incompleteStudents}</div>
        </div>
      </div>

      <div class="report-footer">Report shows live progress at the time of generation.</div>
    </div>`;
        };

        const handleGenerateReport = async () => {
            if (reportLoading) return;
            setReportLoading(true);
            setError('');
            const sectionLabel = isStaff ? (defaultSection || 'A') : (section === 'ALL' ? 'ALL' : section);
            const yearLabel = isStaff ? (staffYear || '-') : (yearFilter === 'ALL' ? '-' : yearFilter);
            let container = null;

            try {
                container = document.createElement('div');
                container.style.position = 'fixed';
                container.style.left = '-9999px';
                container.style.top = '0';
                container.style.background = '#ffffff';
                container.innerHTML = buildReportHtml();
                document.body.appendChild(container);

                const target = container.querySelector('.report-page');
                if (!target) throw new Error('Report template not found');
                const canvas = await html2canvas(target, { scale: 2, backgroundColor: '#ffffff' });
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'pt', 'a4');
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
                const imgWidth = canvas.width * ratio;
                const imgHeight = canvas.height * ratio;
                const x = (pageWidth - imgWidth) / 2;
                const y = 20;
                pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
                pdf.save(`report_${sectionLabel}_year_${yearLabel}.pdf`);
            } catch (err) {
                console.error('Report generation failed:', err);
                setError('Report generation failed. Please try again.');
            } finally {
                if (container && container.parentNode) {
                    container.parentNode.removeChild(container);
                }
                setReportLoading(false);
            }
        };

        const adminCanGenerateReport = Boolean(isAdmin && yearFilter !== 'ALL');

    return (
        <div style={{ ...styles.page, backgroundColor: themeStyles.pageBg, color: themeStyles.textPrimary }}>
            <div style={{ ...styles.nav, backgroundColor: themeStyles.navBg, borderBottom: `1px solid ${themeStyles.navBorder}` }}>
                <div style={{ ...styles.brand, color: themeStyles.textPrimary }}>Academic Performance Dashboard</div>
                <div style={styles.navRight}>
                    <span style={{ ...styles.user, color: themeStyles.textSecondary }}>👤 {user.username}</span>
                    <button style={styles.themeBtn} onClick={onToggleTheme}>{isLight ? '🌙' : '☀️'}</button>
                    <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
                </div>
            </div>

            <div style={styles.container}>
                <div style={styles.headerRow}>
                    <div>
                        <h1 style={{ ...styles.title, color: themeStyles.textPrimary }}>Section-Based Academic Insights</h1>
                        <p style={{ ...styles.subtitle, color: themeStyles.textSecondary }}>Monitor performance without modifying student data.</p>
                    </div>
                    <div style={styles.controls}>
                        {!isStaff && (
                            <div style={{ ...styles.filterBox, backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}>
                                <label style={{ ...styles.label, color: themeStyles.textSecondary }}>Filter by year</label>
                                <select
                                    value={yearFilter}
                                    onChange={(e) => setYearFilter(e.target.value)}
                                    style={{ ...styles.select, backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder, color: themeStyles.textPrimary }}
                                >
                                    <option value="ALL">All Years</option>
                                    {availableYears.map((yr) => (
                                        <option key={yr} value={String(yr)}>{yr}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {!isStaff && (
                            <div style={{ ...styles.filterBox, backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}>
                                <label style={{ ...styles.label, color: themeStyles.textSecondary }}>Filter by section</label>
                                <select
                                    value={section}
                                    onChange={(e) => setSection(e.target.value)}
                                    style={{ ...styles.select, backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder, color: themeStyles.textPrimary }}
                                >
                                    <option value="ALL">All Sections</option>
                                    {SECTIONS.map(sec => (
                                        <option key={sec} value={sec}>{sec}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div style={{ ...styles.searchBox, backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}>
                            <label style={{ ...styles.label, color: themeStyles.textSecondary }}>Search student</label>
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Name or Roll No"
                                style={{ ...styles.searchInput, backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder, color: themeStyles.textPrimary }}
                            />
                        </div>

                        {(isStaff || isAdmin) && (
                            <button
                                style={styles.reportBtn}
                                onClick={handleGenerateReport}
                                disabled={reportLoading || (isAdmin && !adminCanGenerateReport)}
                                title={isAdmin && !adminCanGenerateReport ? 'Select a specific Year to generate the report' : ''}
                            >
                                {reportLoading ? 'Generating...' : 'Generate Report'}
                            </button>
                        )}
                    </div>
                </div>

                {loading && <div style={styles.infoCard}>Loading analytics...</div>}
                {error && <div style={{ ...styles.infoCard, backgroundColor: '#3f1d1d', borderColor: '#b91c1c' }}>{error}</div>}

                {!loading && !error && data && (
                    <>
                        <div style={styles.grid}>
                            {summary.map(item => (
                                <div key={item.section} style={styles.summaryGroup}>
                                    <div style={{ ...styles.card, backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}>
                                        <div style={styles.cardHeader}>{item.section}</div>
                                        <div style={styles.metricRow}>
                                            <div style={{ ...styles.metricLabel, color: themeStyles.textSecondary }}>Completed Students</div>
                                            <div style={styles.metricValue}>{item.completedStudents}</div>
                                        </div>
                                        <div style={styles.metricRow}>
                                            <div style={{ ...styles.metricLabel, color: themeStyles.textSecondary }}>Students</div>
                                            <div style={styles.metricValue}>{item.count}</div>
                                        </div>
                                    </div>
                                    <div style={{ ...styles.card, backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}>
                                        <div style={styles.cardHeader}>Top Student</div>
                                        {item.topStudent ? (
                                            <div style={{ ...styles.topBody, marginTop: '8px' }}>
                                                <div style={styles.topName}>{item.topStudent.username}</div>
                                                <div style={{ ...styles.topMeta, color: themeStyles.textSecondary }}>{item.topStudent.email}</div>
                                                <div style={styles.topScore}>Completed: {item.topStudent.completedCount} / {totalQuestions}</div>
                                            </div>
                                        ) : (
                                            <div style={{ ...styles.topMeta, color: themeStyles.textSecondary }}>No data</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ ...styles.tableCard, backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}>
                            <div style={{ ...styles.tableHeader, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>
                                Student Progress (
                                {!isStaff && yearFilter !== 'ALL' ? `Year ${yearFilter}, ` : ''}
                                {section === 'ALL' ? 'All Sections' : section}
                                {normalizedQuery ? `, Search: "${searchQuery}"` : ''}
                                )
                            </div>
                            <div style={styles.tableWrap}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={{ ...styles.th, color: themeStyles.textSecondary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>Student</th>
                                            <th style={{ ...styles.th, color: themeStyles.textSecondary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>Email</th>
                                            <th style={{ ...styles.th, color: themeStyles.textSecondary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>Roll No</th>
                                            <th style={{ ...styles.th, color: themeStyles.textSecondary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>Year</th>
                                            <th style={{ ...styles.th, color: themeStyles.textSecondary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>Section</th>
                                            <th style={{ ...styles.th, color: themeStyles.textSecondary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>SQL Done</th>
                                            <th style={{ ...styles.th, color: themeStyles.textSecondary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>SQL Total</th>
                                            <th style={{ ...styles.th, color: themeStyles.textSecondary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>NoSQL Done</th>
                                            <th style={{ ...styles.th, color: themeStyles.textSecondary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>NoSQL Total</th>
                                            <th style={{ ...styles.th, color: themeStyles.textSecondary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>All Done</th>
                                            <th style={{ ...styles.th, color: themeStyles.textSecondary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>All Total</th>
                                            <th style={{ ...styles.th, color: themeStyles.textSecondary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedStudents.map((s) => {
                                            const sqlCompleted = getSqlCompleted(s);
                                            const nosqlCompleted = getNosqlCompleted(s);
                                            const completed = sqlCompleted + nosqlCompleted;
                                            const total = totalQuestions;
                                            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
                                            return (
                                                <tr key={s._id}>
                                                    <td style={{ ...styles.td, color: themeStyles.textPrimary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>{s.username}</td>
                                                    <td style={{ ...styles.td, color: themeStyles.textPrimary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>{s.email}</td>
                                                    <td style={{ ...styles.td, color: themeStyles.textPrimary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>{s.roll_number || '-'}</td>
                                                    <td style={{ ...styles.td, color: themeStyles.textPrimary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>{s.year || '-'}</td>
                                                    <td style={{ ...styles.td, color: themeStyles.textPrimary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>{s.section || '-'}</td>
                                                    <td style={{ ...styles.td, color: themeStyles.textPrimary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>{sqlCompleted}</td>
                                                    <td style={{ ...styles.td, color: themeStyles.textPrimary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>{totalSqlQuestions}</td>
                                                    <td style={{ ...styles.td, color: themeStyles.textPrimary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>{nosqlCompleted}</td>
                                                    <td style={{ ...styles.td, color: themeStyles.textPrimary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>{totalNosqlQuestions}</td>
                                                    <td style={{ ...styles.td, color: themeStyles.textPrimary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>{completed}</td>
                                                    <td style={{ ...styles.td, color: themeStyles.textPrimary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>{total}</td>
                                                    <td style={{ ...styles.td, color: themeStyles.textPrimary, borderBottom: `1px solid ${themeStyles.cardBorder}` }}>{progress}%</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const styles = {
    page: {
        height: '100vh',
        backgroundColor: '#0b1120',
        color: '#e2e8f0',
        fontFamily: "'Space Grotesk', sans-serif",
        overflowY: 'auto'
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 28px',
        borderBottom: '1px solid #1f2937',
        backgroundColor: '#0b1120'
    },
    brand: {
        fontSize: '18px',
        fontWeight: '700',
        letterSpacing: '1px'
    },
    navRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    user: {
        color: '#94a3b8'
    },
    themeBtn: {
        width: '36px',
        height: '36px',
        borderRadius: '999px',
        border: '1px solid #1f2937',
        backgroundColor: 'transparent',
        color: '#e2e8f0',
        cursor: 'pointer',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoutBtn: {
        backgroundColor: '#ef4444',
        border: 'none',
        color: '#fff',
        padding: '8px 14px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 20px 80px'
    },
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '24px'
    },
    controls: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontSize: '32px',
        marginBottom: '6px'
    },
    subtitle: {
        color: '#94a3b8'
    },
    filterBox: {
        backgroundColor: '#111827',
        padding: '14px 16px',
        borderRadius: '12px',
        border: '1px solid #1f2937'
    },
    searchBox: {
        backgroundColor: '#111827',
        padding: '14px 16px',
        borderRadius: '12px',
        border: '1px solid #1f2937'
    },
        reportBtn: {
            backgroundColor: '#2563eb',
            border: 'none',
            color: '#ffffff',
            padding: '10px 16px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600'
        },
    label: {
        display: 'block',
        fontSize: '12px',
        color: '#94a3b8',
        marginBottom: '6px'
    },
    select: {
        width: '180px',
        padding: '8px 10px',
        backgroundColor: '#0b1120',
        border: '1px solid #1f2937',
        borderRadius: '8px',
        color: '#e2e8f0'
    },
    searchInput: {
        width: '220px',
        padding: '8px 10px',
        backgroundColor: '#0b1120',
        border: '1px solid #1f2937',
        borderRadius: '8px',
        color: '#e2e8f0',
        outline: 'none'
    },
    infoCard: {
        padding: '14px 16px',
        borderRadius: '10px',
        backgroundColor: '#111827',
        border: '1px solid #1f2937'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(560px, 1fr))',
        justifyContent: 'flex-start',
        gap: '20px'
    },
    summaryGroup: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '16px'
    },
    card: {
        backgroundColor: '#121826',
        border: '1px solid #1f2937',
        borderRadius: '16px',
        padding: '20px',
        minHeight: '210px'
    },
    cardHeader: {
        fontSize: '18px',
        fontWeight: '700',
        marginBottom: '12px'
    },
    metricRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '12px'
    },
    metricLabel: {
        color: '#94a3b8',
        fontSize: '13px'
    },
    metricValue: {
        fontWeight: '700'
    },
    topStudent: {
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid #1f2937'
    },
    topTitle: {
        fontSize: '12px',
        color: '#94a3b8',
        marginBottom: '6px'
    },
    topBody: {
        fontSize: '13px'
    },
    topName: {
        fontWeight: '700'
    },
    topMeta: {
        color: '#94a3b8',
        fontSize: '12px'
    },
    topScore: {
        marginTop: '6px'
    },
    tableCard: {
        marginTop: '24px',
        backgroundColor: '#121826',
        border: '1px solid #1f2937',
        borderRadius: '16px',
        overflow: 'hidden'
    },
    tableHeader: {
        padding: '14px 18px',
        borderBottom: '1px solid #1f2937',
        fontWeight: '700'
    },
    tableWrap: {
        overflowX: 'auto',
        maxHeight: '420px',
        overflowY: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    th: {
        textAlign: 'left',
        padding: '12px 16px',
        fontSize: '12px',
        color: '#94a3b8',
        borderBottom: '1px solid #1f2937'
    },
    td: {
        padding: '12px 16px',
        borderBottom: '1px solid #1f2937',
        fontSize: '13px'
    }
};

export default HodDashboard;
