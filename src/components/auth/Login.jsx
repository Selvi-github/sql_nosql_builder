import React, { useState } from 'react';

const Login = ({ onLogin, theme, onToggleTheme }) => {
    const [step, setStep] = useState(1); // 1 = Role Selection, 2 = Credentials Input
    const [role, setRole] = useState('STUDENT'); // STUDENT | STAFF | ADMIN | OTHER
    const [rollNumber, setRollNumber] = useState('');
    const [otherName, setOtherName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (role === 'STUDENT') {
            if (!rollNumber) {
                setError('Please enter your roll number.');
                return;
            }
        }

        if (role === 'STAFF') {
            if (!email || !password) {
                setError('Please enter email and password.');
                return;
            }
        }

        if (role === 'ADMIN') {
            if (!email || !password) {
                setError('Please enter admin email and password.');
                return;
            }
        }

        if (role === 'OTHER') {
            if (!otherName || !password) {
                setError('Please enter name and password.');
                return;
            }
        }

        setLoading(true);
        setError('');

        try {
            const body = role === 'STUDENT'
                ? { role, rollNumber }
                : role === 'STAFF'
                    ? { role, email, password }
                    : role === 'OTHER'
                        ? { role, name: otherName, password }
                        : { role, email, password };

            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();

            if (data.success) {
                const userWithToken = { ...data.user, token: data.token };
                onLogin(userWithToken);
            } else {
                setError(data.error || 'Login failed.');
            }
        } catch (err) {
            setError('System connection error. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    const isLight = theme === 'light';
    const themeStyles = {
        pageBg: isLight ? '#f8fafc' : '#0b1120',
        cardBg: isLight ? '#ffffff' : '#161e31',
        cardBorder: isLight ? '#e2e8f0' : '#1f2937',
        titleText: isLight ? '#0f172a' : '#f8fafc',
        subtitleText: isLight ? '#475569' : '#94a3b8',
        labelText: isLight ? '#1f2937' : '#cbd5e1',
        inputBg: isLight ? '#ffffff' : '#0b1120',
        inputBorder: isLight ? '#cbd5e1' : '#1f2937',
        inputText: isLight ? '#0f172a' : '#f8fafc',
    };

    if (step === 1) {
        return (
            <div style={{ ...styles.container, backgroundColor: themeStyles.pageBg }}>
                <style>{`
                    .role-card-hover {
                        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    .role-card-hover:hover {
                        transform: translateY(-6px);
                        border-color: #38bdf8 !important;
                        box-shadow: 0 12px 30px -5px rgba(56, 189, 248, 0.25) !important;
                    }
                `}</style>
                <div style={{ ...styles.card, maxWidth: '600px', backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}>
                    <div style={styles.header}>
                        <div style={styles.headerRow}>
                            <h1 style={{ ...styles.title, color: themeStyles.titleText }}>DualDB Query Architect</h1>
                            <button type="button" onClick={onToggleTheme} style={styles.themeBtn}>
                                {isLight ? '🌙' : '☀️'}
                            </button>
                        </div>
                        <p style={{ ...styles.subtitle, color: themeStyles.subtitleText }}>Academic Learning Platform</p>
                    </div>

                    <h2 style={{ ...styles.stepTitle, color: themeStyles.titleText }}>Who are you? Select your role</h2>

                    <div style={styles.rolesGrid}>
                        <div
                            onClick={() => { setRole('STUDENT'); setStep(2); setError(''); }}
                            className="role-card-hover"
                            style={{ ...styles.roleCard, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder }}
                        >
                            <span style={styles.roleCardIcon}>🎓</span>
                            <h3 style={{ ...styles.roleCardTitle, color: themeStyles.titleText }}>Student</h3>
                            <p style={{ ...styles.roleCardDesc, color: themeStyles.subtitleText }}>Learn SQL & NoSQL using visual block builders</p>
                        </div>

                        <div
                            onClick={() => { setRole('STAFF'); setStep(2); setError(''); }}
                            className="role-card-hover"
                            style={{ ...styles.roleCard, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder }}
                        >
                            <span style={styles.roleCardIcon}>🏫</span>
                            <h3 style={{ ...styles.roleCardTitle, color: themeStyles.titleText }}>Staff</h3>
                            <p style={{ ...styles.roleCardDesc, color: themeStyles.subtitleText }}>Track student progress & export class reports</p>
                        </div>

                        <div
                            onClick={() => { setRole('OTHER'); setStep(2); setError(''); }}
                            className="role-card-hover"
                            style={{ ...styles.roleCard, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder }}
                        >
                            <span style={styles.roleCardIcon}>👤</span>
                            <h3 style={{ ...styles.roleCardTitle, color: themeStyles.titleText }}>Other User</h3>
                            <p style={{ ...styles.roleCardDesc, color: themeStyles.subtitleText }}>Create profile & run custom sandbox queries</p>
                        </div>

                        <div
                            onClick={() => { setRole('ADMIN'); setStep(2); setError(''); }}
                            className="role-card-hover"
                            style={{ ...styles.roleCard, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder }}
                        >
                            <span style={styles.roleCardIcon}>🛠️</span>
                            <h3 style={{ ...styles.roleCardTitle, color: themeStyles.titleText }}>Admin</h3>
                            <p style={{ ...styles.roleCardDesc, color: themeStyles.subtitleText }}>Manage system metrics & data configurations</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Step 2: Credentials Form
    return (
        <div style={{ ...styles.container, backgroundColor: themeStyles.pageBg }}>
            <style>{`
                .back-btn-hover {
                    transition: color 0.2s ease;
                }
                .back-btn-hover:hover {
                    color: #38bdf8 !important;
                }
            `}</style>
            <div style={{ ...styles.card, backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}>
                <button
                    type="button"
                    onClick={() => { setStep(1); setError(''); }}
                    className="back-btn-hover"
                    style={styles.backBtn}
                >
                    ← Back to Roles
                </button>

                <div style={styles.header}>
                    <h2 style={{ ...styles.formTitle, color: themeStyles.titleText }}>
                        Sign In as {role === 'OTHER' ? 'Other User' : role.charAt(0) + role.slice(1).toLowerCase()}
                    </h2>
                    <p style={{ ...styles.subtitle, color: themeStyles.subtitleText }}>Enter your credentials below</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {role === 'STUDENT' && (
                        <div style={styles.inputGroup}>
                            <label style={{ ...styles.label, color: themeStyles.labelText }}>Roll Number</label>
                            <input
                                type="text"
                                placeholder="Enter your roll number"
                                value={rollNumber}
                                onChange={(e) => setRollNumber(e.target.value)}
                                style={{ ...styles.input, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder, color: themeStyles.inputText }}
                                required
                                autoFocus
                            />
                        </div>
                    )}

                    {role === 'STAFF' && (
                        <>
                            <div style={styles.inputGroup}>
                                <label style={{ ...styles.label, color: themeStyles.labelText }}>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="staff@college.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ ...styles.input, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder, color: themeStyles.inputText }}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={{ ...styles.label, color: themeStyles.labelText }}>Staff Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter staff password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ ...styles.input, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder, color: themeStyles.inputText }}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {role === 'ADMIN' && (
                        <>
                            <div style={styles.inputGroup}>
                                <label style={{ ...styles.label, color: themeStyles.labelText }}>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="admin@college.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ ...styles.input, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder, color: themeStyles.inputText }}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={{ ...styles.label, color: themeStyles.labelText }}>Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter admin password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ ...styles.input, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder, color: themeStyles.inputText }}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {role === 'OTHER' && (
                        <>
                            <div style={styles.inputGroup}>
                                <label style={{ ...styles.label, color: themeStyles.labelText }}>Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={otherName}
                                    onChange={(e) => setOtherName(e.target.value)}
                                    style={{ ...styles.input, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder, color: themeStyles.inputText }}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={{ ...styles.label, color: themeStyles.labelText }}>Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ ...styles.input, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder, color: themeStyles.inputText }}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {error && <p style={styles.error}>{error}</p>}

                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? 'Please wait...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
        backgroundColor: '#0b1120',
        fontFamily: "'Space Grotesk', sans-serif",
        padding: '40px 24px'
    },
    card: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#161e31',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        border: '1px solid #1f2937',
        boxSizing: 'border-box'
    },
    header: {
        textAlign: 'center',
        marginBottom: '24px'
    },
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
    },
    title: {
        fontSize: '1.75rem',
        color: '#f8fafc',
        fontWeight: '800',
        margin: '0',
        background: 'linear-gradient(135deg, #6366f1, #0ea5e9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    },
    subtitle: {
        color: '#94a3b8',
        fontSize: '0.875rem',
        margin: '8px 0 0 0'
    },
    stepTitle: {
        fontSize: '1.2rem',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '24px',
        marginTop: '20px'
    },
    formTitle: {
        fontSize: '1.5rem',
        fontWeight: '800',
        margin: '0',
        color: '#f8fafc'
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
        justifyContent: 'center',
        padding: '0'
    },
    backBtn: {
        border: 'none',
        backgroundColor: 'transparent',
        color: '#94a3b8',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.9rem',
        marginBottom: '24px',
        padding: '0',
        fontWeight: '600'
    },
    rolesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginTop: '10px'
    },
    roleCard: {
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid #1f2937',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        boxSizing: 'border-box'
    },
    roleCardIcon: {
        fontSize: '36px',
        marginBottom: '12px'
    },
    roleCardTitle: {
        fontSize: '1.1rem',
        fontWeight: '700',
        margin: '0 0 8px 0'
    },
    roleCardDesc: {
        fontSize: '0.8rem',
        margin: '0',
        lineHeight: '1.4'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#cbd5e1'
    },
    input: {
        padding: '12px 16px',
        backgroundColor: '#0b1120',
        border: '1px solid #1f2937',
        borderRadius: '10px',
        color: '#f8fafc',
        fontSize: '1rem',
        outline: 'none',
        boxSizing: 'border-box',
        width: '100%'
    },
    error: {
        color: '#f87171',
        fontSize: '0.875rem',
        textAlign: 'center',
        margin: '0'
    },
    button: {
        padding: '14px',
        backgroundColor: '#4f46e5',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
        boxSizing: 'border-box',
        width: '100%',
        marginTop: '10px'
    }
};

export default Login;
