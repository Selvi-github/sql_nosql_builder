import React, { useState } from 'react';

const Login = ({ onLogin, theme, onToggleTheme }) => {
    const [role, setRole] = useState('STUDENT'); // STUDENT | STAFF | ADMIN
    const [studentName, setStudentName] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [year, setYear] = useState('2');
    const [section, setSection] = useState('A');
    const [staffName, setStaffName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (role === 'STUDENT') {
            if (!studentName || !rollNumber || !year || !section) {
                setError('Please enter name, roll number, year, and section.');
                return;
            }
        }

        if (role === 'STAFF') {
            if (!staffName || !email) {
                setError('Please enter staff name and email.');
                return;
            }
        }

        if (role === 'ADMIN') {
            if (!email || !password) {
                setError('Please enter admin email and password.');
                return;
            }
        }

        setLoading(true);
        setError('');

        try {
            const body = role === 'STUDENT'
                ? { role, name: studentName, rollNumber, year, section }
                : role === 'STAFF'
                    ? { role, name: staffName, email }
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
        roleBg: isLight ? '#f1f5f9' : '#0b1120',
        roleBorder: isLight ? '#cbd5e1' : '#1f2937',
        roleText: isLight ? '#475569' : '#94a3b8',
        roleActiveBg: isLight ? '#ffffff' : '#1f2a44',
        roleActiveText: isLight ? '#0f172a' : '#f8fafc'
    };

    return (
        <div style={{ ...styles.container, backgroundColor: themeStyles.pageBg }}>
            <div style={{ ...styles.card, backgroundColor: themeStyles.cardBg, borderColor: themeStyles.cardBorder }}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1 style={{ ...styles.title, color: themeStyles.titleText }}>DualDB Query Architect</h1>
                        <button type="button" onClick={onToggleTheme} style={styles.themeBtn}>
                            {isLight ? '🌙' : '☀️'}
                        </button>
                    </div>
                    <p style={{ ...styles.subtitle, color: themeStyles.subtitleText }}>Academic Learning Platform</p>
                </div>

                <div style={styles.roleToggle}>
                    <button
                        type="button"
                        onClick={() => setRole('STUDENT')}
                        style={{
                            ...styles.roleBtn,
                            backgroundColor: themeStyles.roleBg,
                            borderColor: themeStyles.roleBorder,
                            color: themeStyles.roleText,
                            ...(role === 'STUDENT' ? {
                                backgroundColor: themeStyles.roleActiveBg,
                                color: themeStyles.roleActiveText,
                                borderColor: '#38bdf8'
                            } : {})
                        }}
                    >
                        Student
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('STAFF')}
                        style={{
                            ...styles.roleBtn,
                            backgroundColor: themeStyles.roleBg,
                            borderColor: themeStyles.roleBorder,
                            color: themeStyles.roleText,
                            ...(role === 'STAFF' ? {
                                backgroundColor: themeStyles.roleActiveBg,
                                color: themeStyles.roleActiveText,
                                borderColor: '#38bdf8'
                            } : {})
                        }}
                    >
                        Staff
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('ADMIN')}
                        style={{
                            ...styles.roleBtn,
                            backgroundColor: themeStyles.roleBg,
                            borderColor: themeStyles.roleBorder,
                            color: themeStyles.roleText,
                            ...(role === 'ADMIN' ? {
                                backgroundColor: themeStyles.roleActiveBg,
                                color: themeStyles.roleActiveText,
                                borderColor: '#38bdf8'
                            } : {})
                        }}
                    >
                        Admin
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {role === 'STUDENT' && (
                        <div style={styles.inputGroup}>
                            <label style={{ ...styles.label, color: themeStyles.labelText }}>Student Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                style={{ ...styles.input, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder, color: themeStyles.inputText }}
                                required
                            />
                        </div>
                    )}

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
                            />
                        </div>
                    )}

                    {role === 'STUDENT' && (
                        <div style={styles.inputGroup}>
                            <label style={{ ...styles.label, color: themeStyles.labelText }}>Year</label>
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                style={{ ...styles.select, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder, color: themeStyles.inputText }}
                                required
                            >
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                            </select>
                        </div>
                    )}

                    {role === 'STUDENT' && (
                        <div style={styles.inputGroup}>
                            <label style={{ ...styles.label, color: themeStyles.labelText }}>Section</label>
                            <select
                                value={section}
                                onChange={(e) => setSection(e.target.value)}
                                style={{ ...styles.select, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder, color: themeStyles.inputText }}
                                required
                            >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>
                    )}

                    {role === 'STAFF' && (
                        <div style={styles.inputGroup}>
                            <label style={{ ...styles.label, color: themeStyles.labelText }}>Staff Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={staffName}
                                onChange={(e) => setStaffName(e.target.value)}
                                style={{ ...styles.input, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder, color: themeStyles.inputText }}
                                required
                            />
                        </div>
                    )}

                    {(role === 'STAFF' || role === 'ADMIN') && (
                        <div style={styles.inputGroup}>
                            <label style={{ ...styles.label, color: themeStyles.labelText }}>Email Address</label>
                            <input
                                type="email"
                                placeholder="staff@college.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ ...styles.input, backgroundColor: themeStyles.inputBg, borderColor: themeStyles.inputBorder, color: themeStyles.inputText }}
                                required
                            />
                        </div>
                    )}

                    {role === 'ADMIN' && (
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
        padding: '24px'
    },
    card: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#161e31',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        border: '1px solid #1f2937'
    },
    roleToggle: {
        display: 'flex',
        gap: '10px',
        marginBottom: '24px'
    },
    roleBtn: {
        flex: 1,
        padding: '10px 12px',
        backgroundColor: '#0b1120',
        border: '1px solid #1f2937',
        color: '#94a3b8',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: '600'
    },
    roleActive: {
        backgroundColor: '#1f2a44',
        color: '#f8fafc',
        borderColor: '#38bdf8'
    },
    header: {
        textAlign: 'center',
        marginBottom: '32px'
    },
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
    },
    title: {
        fontSize: '2rem',
        color: '#f8fafc',
        fontWeight: '800',
        marginBottom: '8px',
        background: 'linear-gradient(135deg, #6366f1, #0ea5e9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    },
    subtitle: {
        color: '#94a3b8',
        fontSize: '0.875rem'
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
        transition: 'all 0.2s'
    },
    select: {
        padding: '12px 16px',
        backgroundColor: '#0b1120',
        border: '1px solid #1f2937',
        borderRadius: '10px',
        color: '#f8fafc',
        fontSize: '1rem',
        outline: 'none'
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
        transition: 'all 0.2s',
        boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)'
    },
    footer: {
        marginTop: '24px',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.75rem'
    }
};

export default Login;
