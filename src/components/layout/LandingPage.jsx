import React, { useState } from 'react';

const LandingPage = ({ user, onStart, onProfile, onLogout, theme, onToggleTheme }) => {
    const [loading, setLoading] = useState(null); // 'SQL' | 'NoSQL' | null
    const [notification, setNotification] = useState(null);

    const isLight = theme === 'light';
    const themeStyles = {
        pageBg: isLight ? '#f8fafc' : '#0b1120',
        navBg: isLight ? '#ffffff' : '#0b1120',
        navBorder: isLight ? '#e2e8f0' : '#1f2937',
        cardBg: isLight ? '#ffffff' : '#161e31',
        cardBorder: isLight ? '#e2e8f0' : '#1f2937',
        textPrimary: isLight ? '#0f172a' : '#f8fafc',
        textSecondary: isLight ? '#475569' : '#94a3b8'
    };

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

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

    const handleInit = async (type) => {
        setLoading(type);
        setNotification(null);
        try {
            const endpoint = type === 'SQL' ? '/api/sql/init' : '/api/nosql/init';
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            const data = await res.json();

            if (data.success) {
                onStart(type);
            } else {
                showNotification('error', "Initialization Failed: " + data.error);
                setLoading(null);
            }
        } catch (e) {
            showNotification('error', "Network Error: Could not connect to server.");
            setLoading(null);
        }
    };

    return (
        <div style={{ ...styles.container, backgroundColor: themeStyles.pageBg }}>
            {/* Top Navigation */}
            <div style={{ ...styles.topNav, backgroundColor: themeStyles.navBg, borderBottom: `1px solid ${themeStyles.navBorder}` }}>
                <div style={styles.userBadge}>
                    <span style={{ ...styles.avatarMini, borderColor: themeStyles.navBorder }}>{'👤'}</span>
                    <span style={{ ...styles.userName, color: themeStyles.textPrimary }}>{user.username}</span>
                </div>
                <div style={styles.navButtons}>
                    <button onClick={onProfile} style={styles.profileBtn}>My Profile</button>
                    <button onClick={onToggleTheme} style={styles.themeBtn}>
                        {isLight ? '🌙' : '☀️'}
                    </button>
                    <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
                </div>
            </div>

            {notification && (
                <div style={{
                    ...styles.notification,
                    backgroundColor: notification.type === 'error' ? '#ef4444' : '#3b82f6',
                }}>
                    {notification.message}
                </div>
            )}

            <div style={styles.contentWrapper}>
                <h1 style={{ ...styles.title, color: themeStyles.textPrimary }}>DualDB Query Architect</h1>
                <p style={{ ...styles.subtitle, color: themeStyles.textSecondary }}>Select your academic environment to begin</p>

                <div style={styles.cardContainer}>
                    {/* SQL CARD */}
                    <div style={{ ...styles.card, backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }} onClick={() => !loading && handleInit('SQL')}>
                        <div style={{ ...styles.icon, color: '#60a5fa' }}>🗄️</div>
                        <h2 style={{ ...styles.cardTitle, color: themeStyles.textPrimary }}>SQL Builder</h2>
                        <p style={{ ...styles.cardDesc, color: themeStyles.textSecondary }}>Relational Databases (MySQL)</p>
                        <ul style={{ ...styles.featureList, color: themeStyles.textSecondary }}>
                            <li>10 Levels | 174 Questions</li>
                            <li>Structure Query Language</li>
                            <li>Managed Cloud Database</li>
                        </ul>
                        <button style={{ ...styles.btn, backgroundColor: '#2563eb' }}>
                            {loading === 'SQL' ? 'Initializing...' : 'Launch SQL Studio'}
                        </button>
                    </div>

                    {/* NoSQL CARD */}
                    <div style={{ ...styles.card, backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }} onClick={() => !loading && handleInit('NoSQL')}>
                        <div style={{ ...styles.icon, color: '#4ade80' }}>🍃</div>
                        <h2 style={{ ...styles.cardTitle, color: themeStyles.textPrimary }}>NoSQL Builder</h2>
                        <p style={{ ...styles.cardDesc, color: themeStyles.textSecondary }}>Document Store (MongoDB)</p>
                        <ul style={{ ...styles.featureList, color: themeStyles.textSecondary }}>
                            <li>20 Levels | 200 Questions</li>
                            <li>Managed Cloud Database</li>
                            <li>JSON-Based Documents</li>
                        </ul>
                        <button style={{ ...styles.btn, backgroundColor: '#16a34a' }}>
                            {loading === 'NoSQL' ? 'Initializing...' : 'Launch Mongo Studio'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
        backgroundColor: '#0b1120',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontFamily: "'Inter', sans-serif"
    },
    topNav: {
        width: '100%',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        borderBottom: '1px solid #1f2937',
        backgroundColor: '#0b1120'
    },
    userBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    avatarMini: {
        backgroundColor: '#161e31',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        fontSize: '14px',
        border: '1px solid #1f2937'
    },
    userName: {
        color: '#f8fafc',
        fontWeight: '600',
        fontSize: '0.9rem'
    },
    navButtons: {
        display: 'flex',
        gap: '12px'
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
    profileBtn: {
        backgroundColor: '#4f46e5',
        border: 'none',
        color: '#ffffff',
        padding: '8px 18px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
        transition: 'all 0.2s'
    },
    logoutBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#94a3b8',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '13px'
    },
    notification: {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    },
    contentWrapper: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '40px 20px',
        boxSizing: 'border-box'
    },
    title: {
        fontSize: '3.5rem',
        marginBottom: '10px',
        background: 'linear-gradient(135deg, #6366f1, #0ea5e9, #34d399)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: '800',
        textAlign: 'center',
        lineHeight: '1.2',
    },
    subtitle: {
        color: '#94a3b8',
        marginBottom: '60px',
        fontSize: '1.2rem',
        textAlign: 'center'
    },
    cardContainer: {
        display: 'flex',
        gap: '40px',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    card: {
        flex: '1 1 300px',
        minWidth: '300px',
        maxWidth: '400px',
        backgroundColor: '#161e31',
        borderRadius: '24px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        border: '1px solid #1f2937',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    icon: {
        fontSize: '64px',
        marginBottom: '24px',
    },
    cardTitle: {
        fontSize: '1.8rem',
        marginBottom: '10px',
        textAlign: 'center',
        color: '#f8fafc'
    },
    cardDesc: {
        color: '#94a3b8',
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        marginBottom: '32px',
        textAlign: 'center'
    },
    featureList: {
        listStyle: 'none',
        padding: 0,
        textAlign: 'center',
        color: '#cbd5e1',
        lineHeight: '2.2',
        marginBottom: '32px',
        fontSize: '0.95rem'
    },
    btn: {
        width: '100%',
        padding: '16px',
        border: 'none',
        borderRadius: '12px',
        color: 'white',
        fontWeight: '700',
        fontSize: '1rem',
        cursor: 'pointer',
        letterSpacing: '0.5px'
    }
};

export default LandingPage;
