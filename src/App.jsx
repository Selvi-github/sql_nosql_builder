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
            setView(data.user.role === 'HOD' ? 'HOD' : 'LANDING');
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
    setView(userData.role === 'HOD' ? 'HOD' : 'LANDING');
    localStorage.setItem('qa_auth', JSON.stringify({ token: userData.token }));
  };

  const handleLogout = () => {
    setUser(null);
    setView('LOGIN');
    localStorage.removeItem('qa_auth');
  };

  return (
    <div className="app-root">
      {view === 'LOGIN' && <Login onLogin={handleLogin} />}

      {user && view === 'LANDING' && user.role !== 'HOD' && (
        <LandingPage
          user={user}
          onStart={(type) => setView(type)}
          onProfile={() => setView('PROFILE')}
          onLogout={handleLogout}
        />
      )}

      {user && view === 'HOD' && (
        <HodDashboard
          user={user}
          onLogout={handleLogout}
        />
      )}

      {user && view === 'PROFILE' && (
        <Profile
          user={user}
          sqlProgress={user.sqlProgress}
          nosqlProgress={user.nosqlProgress}
          onBack={() => setView('LANDING')}
        />
      )}

      {user && (view === 'SQL' || view === 'NoSQL') && (
        <GameProvider
          key={view}
          dbType={view}
          user={user}
          initialProgress={view === 'SQL' ? user.sqlProgress : user.nosqlProgress}
        >
          <div style={styles.navBar}>
            <div style={styles.brand}>
              Query Architect <span style={styles.tag}>{view}</span>
            </div>
            <div style={styles.navActions}>
              <span style={styles.userHead}>👤 {user.username}</span>
              <button style={styles.exitBtn} onClick={() => setView('LANDING')}>Exit Builder</button>
            </div>
          </div>
          <GameLayout dbType={view} />
        </GameProvider>
      )}
    </div>
  );
}

const styles = {
  navBar: {
    height: '60px',
    backgroundColor: '#0b1120',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    borderBottom: '1px solid #1f2937'
  },
  brand: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  tag: {
    backgroundColor: '#161e31',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#38bdf8',
    border: '1px solid #1f2937',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  userHead: {
    color: '#94a3b8',
    fontSize: '14px'
  },
  exitBtn: {
    backgroundColor: '#4f46e5',
    border: 'none',
    color: '#ffffff',
    padding: '8px 18px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }
};

export default App;