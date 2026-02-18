import React, { useEffect, useState } from 'react';
import { sqlLevels, nosqlLevels } from '../../data/levels';

const SECTIONS = ['CSE-A', 'CSE-B', 'CSE-C'];

const HodDashboard = ({ user, onLogout }) => {
    const [section, setSection] = useState('ALL');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
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

    const buildSummary = (students) => {
        return SECTIONS.map(sec => {
            const sectionStudents = students.filter(s => (s.department_section || 'CSE-A') === sec);
            const count = sectionStudents.length;
            const totalCompleted = sectionStudents.reduce((sum, s) => sum + getCompletedCount(s), 0);
            const avgCompleted = count > 0 ? totalCompleted / count : 0;
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
                topStudent
            };
        });
    };

    const students = (data && data.students) || [];
    const normalizedStudents = students
        .map(s => ({
            ...s,
            department_section: (s.department_section || 'CSE-A').toUpperCase()
        }))
        .filter(s => s.username && s.email);

    const filteredStudents = section === 'ALL'
        ? normalizedStudents
        : normalizedStudents.filter(s => s.department_section === section);

    const summary = buildSummary(normalizedStudents);

    return (
        <div style={styles.page}>
            <div style={styles.nav}>
                <div style={styles.brand}>Academic Performance Dashboard</div>
                <div style={styles.navRight}>
                    <span style={styles.user}>👤 {user.username}</span>
                    <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
                </div>
            </div>

            <div style={styles.container}>
                <div style={styles.headerRow}>
                    <div>
                        <h1 style={styles.title}>Section-Based Academic Insights</h1>
                        <p style={styles.subtitle}>Monitor performance without modifying student data.</p>
                    </div>
                    <div style={styles.filterBox}>
                        <label style={styles.label}>Filter by section</label>
                        <select value={section} onChange={(e) => setSection(e.target.value)} style={styles.select}>
                            <option value="ALL">All Sections</option>
                            {SECTIONS.map(sec => (
                                <option key={sec} value={sec}>{sec}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading && <div style={styles.infoCard}>Loading analytics...</div>}
                {error && <div style={{ ...styles.infoCard, backgroundColor: '#3f1d1d', borderColor: '#b91c1c' }}>{error}</div>}

                {!loading && !error && data && (
                    <>
                        <div style={styles.grid}>
                            {summary.map(item => (
                                <div key={item.section} style={styles.card}>
                                    <div style={styles.cardHeader}>{item.section}</div>
                                    <div style={styles.metricRow}>
                                        <div style={styles.metricLabel}>Avg Completed</div>
                                        <div style={styles.metricValue}>{Math.round(item.avgCompleted)}</div>
                                    </div>
                                    <div style={styles.metricRow}>
                                        <div style={styles.metricLabel}>Students</div>
                                        <div style={styles.metricValue}>{item.count}</div>
                                    </div>
                                    <div style={styles.topStudent}>
                                        <div style={styles.topTitle}>Top Student</div>
                                        {item.topStudent ? (
                                            <div style={styles.topBody}>
                                                <div style={styles.topName}>{item.topStudent.username}</div>
                                                <div style={styles.topMeta}>{item.topStudent.email}</div>
                                                <div style={styles.topScore}>Completed: {item.topStudent.completedCount} / {totalQuestions}</div>
                                            </div>
                                        ) : (
                                            <div style={styles.topMeta}>No data</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={styles.tableCard}>
                            <div style={styles.tableHeader}>
                                Student Progress ({section === 'ALL' ? 'All Sections' : section})
                            </div>
                            <div style={styles.tableWrap}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>Student</th>
                                            <th style={styles.th}>Email</th>
                                            <th style={styles.th}>Roll No</th>
                                            <th style={styles.th}>Section</th>
                                            <th style={styles.th}>SQL Done</th>
                                            <th style={styles.th}>SQL Total</th>
                                            <th style={styles.th}>NoSQL Done</th>
                                            <th style={styles.th}>NoSQL Total</th>
                                            <th style={styles.th}>All Done</th>
                                            <th style={styles.th}>All Total</th>
                                            <th style={styles.th}>Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredStudents.map((s) => {
                                            const sqlCompleted = getSqlCompleted(s);
                                            const nosqlCompleted = getNosqlCompleted(s);
                                            const completed = sqlCompleted + nosqlCompleted;
                                            const total = totalQuestions;
                                            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
                                            return (
                                                <tr key={s._id}>
                                                    <td style={styles.td}>{s.username}</td>
                                                    <td style={styles.td}>{s.email}</td>
                                                    <td style={styles.td}>{s.roll_number || '-'}</td>
                                                    <td style={styles.td}>{s.department_section}</td>
                                                    <td style={styles.td}>{sqlCompleted}</td>
                                                    <td style={styles.td}>{totalSqlQuestions}</td>
                                                    <td style={styles.td}>{nosqlCompleted}</td>
                                                    <td style={styles.td}>{totalNosqlQuestions}</td>
                                                    <td style={styles.td}>{completed}</td>
                                                    <td style={styles.td}>{total}</td>
                                                    <td style={styles.td}>{progress}%</td>
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
    infoCard: {
        padding: '14px 16px',
        borderRadius: '10px',
        backgroundColor: '#111827',
        border: '1px solid #1f2937'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '18px'
    },
    card: {
        backgroundColor: '#121826',
        border: '1px solid #1f2937',
        borderRadius: '16px',
        padding: '18px'
    },
    cardHeader: {
        fontSize: '18px',
        fontWeight: '700',
        marginBottom: '12px'
    },
    metricRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px'
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
