import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import API_URL from './config';
import './AdminLogin.css';

const AdminLogin = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        onNavigate('admin-dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <img src="/logo.png" alt="TaxLegal Logo" className="login-logo" onError={(e) => e.target.style.display='none'} />
            <h2>Admin Login</h2>
            <p>Enter your credentials to manage the blog</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="admin@taxlegal.com"
                required 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" disabled={loading} className="login-button">
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="login-footer">
            <button onClick={() => onNavigate('home')} className="back-link">
              ← Back to Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
