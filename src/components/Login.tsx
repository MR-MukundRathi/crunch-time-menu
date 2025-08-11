import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

interface LoginProps {
  correctPassword: string;
}

const Login: React.FC<LoginProps> = ({ correctPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [authenticated, setAuthenticated] = useState(() => {
    // Check if user is already authenticated
    return localStorage.getItem('adminAuthenticated') === 'true';
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      localStorage.setItem('adminAuthenticated', 'true');
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (authenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 8 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 4,
              border: '1px solid #ddd',
            }}
          />
        </div>
        {error && (
          <div style={{ color: '#f44336', marginBottom: 16 }}>
            Incorrect password. Please try again.
          </div>
        )}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Login
        </button>
      </form>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <a href="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
          Back to Menu
        </a>
      </div>
    </div>
  );
};

export default Login;