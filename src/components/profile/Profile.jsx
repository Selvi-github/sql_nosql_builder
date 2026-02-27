import React, { useState } from 'react';
import { sqlLevels, nosqlLevels } from '../../data/levels';
import Certificate from './Certificate';

const Profile = ({ user, sqlProgress, nosqlProgress, onBack, theme }) => {
    const [generating, setGenerating] = useState(null); // 'SQL' | 'NoSQL' | null
    const [certificateData, setCertificateData] = useState(null);

    const isLight = theme !== 'dark';
    const themeStyles = {
        pageBg: isLight ? '#f8fafc' : '#0b1120',
        cardBg: isLight ? '#ffffff' : '#161e31',
        cardBorder: isLight ? '#e2e8f0' : '#1f2937',
        panelBg: isLight ? '#f8fafc' : '#0b1120',
        panelBorder: isLight ? '#e2e8f0' : '#1f2937',
        textPrimary: isLight ? '#0f172a' : '#f1f5f9',
        textSecondary: isLight ? '#475569' : '#94a3b8',
        textMuted: isLight ? '#64748b' : '#94a3b8',
        backBorder: isLight ? '#e2e8f0' : '#1f2937',
        avatarBg: isLight ? '#e2e8f0' : '#1f2937',
        progressTrack: isLight ? '#e2e8f0' : '#1f2937',
        disabledBg: isLight ? '#eef2f7' : '#1e293b',
        disabledBorder: isLight ? '#cbd5e1' : '#334155'
    };

    const calculateProgress = (completed, total) => {
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { percentage, completed, total };
    };

    const totalSqlQuestions = sqlLevels.reduce((acc, lvl) => acc + lvl.questions.length, 0);
    const totalNosqlQuestions = nosqlLevels.reduce((acc, lvl) => acc + lvl.questions.length, 0);

    const sqlStats = calculateProgress(sqlProgress.completedQuestions.length, totalSqlQuestions);
    const nosqlStats = calculateProgress(nosqlProgress.completedQuestions.length, totalNosqlQuestions);

    const handleGenerateCertificate = async (type) => {
        setGenerating(type);
        const date = new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        try {
            await fetch('/api/certificate/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({ dbType: type })
            });
        } catch {
            // best-effort logging for prod certificate tracking
        }

        setCertificateData({
            name: user.username.toUpperCase(),
            date: date,
            type: type
        });
        setGenerating(null);
    };

    const ProgressBar = ({ stats, color }) => (
        <div style={styles.progressContainer}>
            <div style={styles.progressHeader}>
                <span style={{ ...styles.progressLabel, color: themeStyles.textMuted }}>
                    {stats.completed} / {stats.total} Questions
                </span>
                <span style={{ ...styles.progressPercent, color: themeStyles.textPrimary }}>{stats.percentage}%</span>
            </div>
            <div style={{ ...styles.progressTrack, backgroundColor: themeStyles.progressTrack }}>
                <div style={{ ...styles.progressFill, width: `${stats.percentage}%`, backgroundColor: color }}></div>
            </div>
        </div>
    );

    if (certificateData) {
        return (
            <div style={{ position: 'relative' }}>
                <button
                    onClick={() => setCertificateData(null)}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        zIndex: 100,
                        padding: '10px 20px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    ← Close Certificate
                </button>
                <Certificate {...certificateData} />
            </div>
        );
    }

    return (
        <div style={{ ...styles.container, backgroundColor: themeStyles.pageBg, color: themeStyles.textPrimary }}>
            <div style={styles.header}>
                <button
                    onClick={onBack}
                    style={{ ...styles.backBtn, borderColor: themeStyles.backBorder, color: themeStyles.textMuted }}
                >
                    ← Back
                </button>
                <h1 style={styles.title}>Student Profile</h1>
            </div>

            <div style={{ ...styles.card, backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}>
                <div style={{ ...styles.userSection, borderBottomColor: themeStyles.panelBorder }}>
                    <div style={{ ...styles.avatar, backgroundColor: themeStyles.avatarBg }}>👤</div>
                    <div style={styles.userInfo}>
                        <h2 style={styles.userName}>{user.username}</h2>
                        <p style={{ ...styles.userEmail, color: themeStyles.textSecondary }}>{user.email}</p>
                    </div>
                </div>

                <div style={styles.statsGrid}>
                    {/* SQL STATS */}
                    <div style={{ ...styles.statBox, backgroundColor: themeStyles.panelBg, borderColor: themeStyles.panelBorder }}>
                        <h3 style={{ ...styles.statTitle, color: themeStyles.textSecondary }}>SQL Proficiency</h3>
                        <ProgressBar stats={sqlStats} color="#3b82f6" />

                        <div style={styles.certSection}>
                            {sqlStats.percentage >= 100 ? (
                                <button
                                    onClick={() => handleGenerateCertificate('SQL')}
                                    disabled={generating === 'SQL'}
                                    style={{ ...styles.certBtn, backgroundColor: '#2563eb' }}
                                >
                                    {generating === 'SQL' ? 'Generating...' : '🎓 Generate SQL Certificate'}
                                </button>
                            ) : (
                                <div style={styles.lockedCert}>
                                    <p style={{ ...styles.lockedText, color: themeStyles.textMuted }}>
                                        Complete all levels to unlock certificate
                                    </p>
                                    <button disabled style={styles.certBtnDisabled}>Certificate Locked</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* NoSQL STATS */}
                    <div style={{ ...styles.statBox, backgroundColor: themeStyles.panelBg, borderColor: themeStyles.panelBorder }}>
                        <h3 style={{ ...styles.statTitle, color: themeStyles.textSecondary }}>NoSQL Proficiency</h3>
                        <ProgressBar stats={nosqlStats} color="#10b981" />

                        <div style={styles.certSection}>
                            {nosqlStats.percentage >= 100 ? (
                                <button
                                    onClick={() => handleGenerateCertificate('NoSQL')}
                                    disabled={generating === 'NoSQL'}
                                    style={{ ...styles.certBtn, backgroundColor: '#059669' }}
                                >
                                    {generating === 'NoSQL' ? 'Generating...' : '🎓 Generate NoSQL Certificate'}
                                </button>
                            ) : (
                                <div style={styles.lockedCert}>
                                    <p style={{ ...styles.lockedText, color: themeStyles.textMuted }}>
                                        Complete all levels to unlock certificate
                                    </p>
                                    <button
                                        disabled
                                        style={{
                                            ...styles.certBtnDisabled,
                                            backgroundColor: themeStyles.disabledBg,
                                            borderColor: themeStyles.disabledBorder,
                                            color: themeStyles.textMuted
                                        }}
                                    >
                                        Certificate Locked
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        overflowY: 'auto',
        backgroundColor: '#0b1120',
        padding: '40px 20px 100px',
        color: '#f1f5f9',
        fontFamily: "'Inter', sans-serif"
    },
    header: {
        maxWidth: '900px',
        margin: '0 auto 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    backBtn: {
        backgroundColor: 'transparent',
        border: '1px solid #1f2937',
        color: '#64748b',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.2s'
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '700'
    },
    card: {
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#161e31',
        borderRadius: '20px',
        padding: '40px',
        border: '1px solid #1f2937',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)'
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        marginBottom: '40px',
        paddingBottom: '32px',
        borderBottom: '1px solid #1f2937'
    },
    avatar: {
        fontSize: '48px',
        backgroundColor: '#1f2937',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        border: '2px solid #38bdf8'
    },
    userInfo: {
        flex: 1
    },
    userName: {
        fontSize: '1.8rem',
        marginBottom: '4px'
    },
    userEmail: {
        color: '#94a3b8',
        fontSize: '1rem'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px'
    },
    statBox: {
        backgroundColor: '#0b1120',
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid #1f2937'
    },
    statTitle: {
        fontSize: '1.1rem',
        marginBottom: '20px',
        color: '#cbd5e1'
    },
    progressContainer: {
        marginBottom: '24px'
    },
    progressHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
        fontSize: '0.875rem'
    },
    progressLabel: {
        color: '#94a3b8'
    },
    progressPercent: {
        fontWeight: '700',
        color: '#f8fafc'
    },
    progressTrack: {
        height: '8px',
        backgroundColor: '#1f2937',
        borderRadius: '4px',
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        transition: 'width 0.5s ease-in-out'
    },
    certSection: {
        marginTop: '32px',
        textAlign: 'center'
    },
    certBtn: {
        width: '100%',
        padding: '14px',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    },
    certBtnDisabled: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#1e293b',
        color: '#64748b',
        border: '1px dashed #334155',
        borderRadius: '8px',
        cursor: 'not-allowed'
    },
    lockedCert: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    lockedText: {
        fontSize: '0.75rem',
        color: '#64748b'
    }
};

export default Profile;
