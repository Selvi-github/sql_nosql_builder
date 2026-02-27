import React, { useEffect, useState } from 'react';
import { GameProvider } from './context/GameContext';
import GameLayout from './components/layout/GameLayout';
import LandingPage from './components/layout/LandingPage';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import HodDashboard from './components/hod/HodDashboard';
import './App.css';

function App() {
  // Views: 'LOGIN' | 'LANDING' | 'SQL' | 'NoSQL' | 'PROFILE' | 'HOD'
  const [view, setView] = useState('LOGIN');
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('qa_theme');
    return stored === 'light' ? 'light' : 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('qa_theme', next);
      return next;
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem('qa_auth');
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (!parsed || !parsed.token) return;

      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${parsed.token}` }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.success && data.user) {
            setUser({ ...data.user, token: parsed.token });
            const adminView = data.user.role === 'ADMIN' || data.user.role === 'STAFF';
            setView(adminView ? 'HOD' : 'LANDING');
          } else {
            localStorage.removeItem('qa_auth');
          }
        })
        .catch(() => {
          localStorage.removeItem('qa_auth');
        });
    } catch {
      localStorage.removeItem('qa_auth');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    const adminView = userData.role === 'ADMIN' || userData.role === 'STAFF';
    setView(adminView ? 'HOD' : 'LANDING');
    localStorage.setItem('qa_auth', JSON.stringify({ token: userData.token }));
  };

  const handleLogout = () => {
    setUser(null);
    setView('LOGIN');
    localStorage.removeItem('qa_auth');
  };

  useEffect(() => {
    const uiTheme = theme;
    document.body.dataset.uiTheme = uiTheme;
  }, [view, theme]);

  const isLight = theme === 'light';
  const builderTheme = {
    navBg: isLight ? '#ffffff' : '#0b1120',
    navBorder: isLight ? '#e2e8f0' : '#1f2937',
    textPrimary: isLight ? '#0f172a' : '#f8fafc',
    textSecondary: isLight ? '#475569' : '#94a3b8',
    tagBg: isLight ? '#e8f1ff' : '#161e31',
    tagBorder: isLight ? '#c7d2fe' : '#1f2937',
    tagText: isLight ? '#1d4ed8' : '#38bdf8',
    exitBg: isLight ? '#2563eb' : '#4f46e5',
    exitShadow: isLight ? '0 8px 20px -12px rgba(37, 99, 235, 0.6)' : '0 4px 6px -1px rgba(0, 0, 0, 0.4)'
  };

  return (
    <div className="app-root">
      {view === 'LOGIN' && <Login onLogin={handleLogin} theme={theme} onToggleTheme={toggleTheme} />}

      {user && view === 'LANDING' && user.role !== 'ADMIN' && user.role !== 'STAFF' && (
        <LandingPage
          user={user}
          onStart={(type) => setView(type)}
          onProfile={() => setView('PROFILE')}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {user && view === 'HOD' && (
        <HodDashboard
          user={user}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {user && view === 'PROFILE' && (
        <Profile
          user={user}
          sqlProgress={user.sqlProgress}
          nosqlProgress={user.nosqlProgress}
          onBack={() => setView('LANDING')}
          theme={theme}
        />
      )}

      {user && (view === 'SQL' || view === 'NoSQL') && (
        <GameProvider
          key={view}
          dbType={view}
          user={user}
          initialProgress={view === 'SQL' ? user.sqlProgress : user.nosqlProgress}
        >
          <div style={{ ...styles.navBar, backgroundColor: builderTheme.navBg, borderBottom: `1px solid ${builderTheme.navBorder}` }}>
            <div style={{ ...styles.brand, color: builderTheme.textPrimary }}>
              Query Architect <span style={{ ...styles.tag, backgroundColor: builderTheme.tagBg, borderColor: builderTheme.tagBorder, color: builderTheme.tagText }}>{view}</span>
            </div>
            <div style={styles.navActions}>
              <span style={{ ...styles.userHead, color: builderTheme.textSecondary }}>👤 {user.username}</span>
              <button style={{ ...styles.exitBtn, backgroundColor: builderTheme.exitBg, boxShadow: builderTheme.exitShadow }} onClick={() => setView('LANDING')}>Exit Builder</button>
            </div>
          </div>
          <GameLayout dbType={view} theme={theme} />
        </GameProvider>
      )}
    </div>
  );
}

const styles = {
  navBar: {
    height: '60px',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    borderBottom: '1px solid #e2e8f0'
  },
  brand: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  tag: {
    backgroundColor: '#e8f1ff',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#1d4ed8',
    border: '1px solid #c7d2fe',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  userHead: {
    color: '#475569',
    fontSize: '14px'
  },
  exitBtn: {
    backgroundColor: '#2563eb',
    border: 'none',
    color: '#ffffff',
    padding: '8px 18px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    boxShadow: '0 8px 20px -12px rgba(37, 99, 235, 0.6)'
  }
};

export default App;