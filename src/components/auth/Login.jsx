import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [mode, setMode] = useState('LOGIN'); // LOGIN | REGISTER
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mode === 'REGISTER' && !username) {
            setError('Please enter a username.');
            return;
        }
        if (!email || !password) {
            setError('Please enter email and password.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const endpoint = mode === 'REGISTER' ? '/api/auth/register' : '/api/auth/login';
            const body = mode === 'REGISTER'
                ? { username, email, password }
                : { email, password };

            const res = await fetch(endpoint, {
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

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Query Architect</h1>
                    <p style={styles.subtitle}>Academic Learning Platform</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {mode === 'REGISTER' && (
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Username</label>
                            <input
                                type="text"
                                placeholder="Enter your student name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={styles.input}
                                required
                            />
                        </div>
                    )}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="student@college.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="Create a secure password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    {error && <p style={styles.error}>{error}</p>}

                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? 'Please wait...' : (mode === 'REGISTER' ? 'Create Account' : 'Sign In')}
                    </button>
                </form>

                <p style={styles.footer}>
                    {mode === 'REGISTER' ? 'Already have an account?' : "Don't have an account?"}
                    <button
                        type="button"
                        onClick={() => {
                            setError('');
                            setMode(mode === 'REGISTER' ? 'LOGIN' : 'REGISTER');
                        }}
                        style={styles.linkBtn}
                    >
                        {mode === 'REGISTER' ? 'Sign In' : 'Create one'}
                    </button>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0b1120',
        fontFamily: "'Space Grotesk', sans-serif"
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
    header: {
        textAlign: 'center',
        marginBottom: '32px'
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
    },
    linkBtn: {
        marginLeft: '8px',
        background: 'transparent',
        border: 'none',
        color: '#38bdf8',
        fontSize: '0.75rem',
        cursor: 'pointer'
    }
};

export default Login;
