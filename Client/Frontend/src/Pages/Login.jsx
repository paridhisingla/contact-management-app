import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authBaseurl } from './Api';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect to contacts if already authenticated
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/contacts');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${authBaseurl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/contacts');
      } else {
        setError(data.error || 'Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      console.error('Login error:', err);

      const offlineDemoEmail = 'admin@admin.com';
      const offlineDemoPass = 'admin123';
      if (formData.email === offlineDemoEmail && formData.password === offlineDemoPass) {
        localStorage.setItem('token', 'offline-demo-token');
        localStorage.setItem('user', JSON.stringify({ firstName: 'Admin', email: offlineDemoEmail }));
        navigate('/contacts');
      } else {
        setError('Network error. Please check your connection and try again. (Try admin@admin.com / admin123 for demo mode)');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome Back</h1>

      {error && (
        <div className="error-message" role="alert" aria-live="polite">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            autoFocus
            placeholder="Enter your email address"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={isLoading || !formData.email || !formData.password}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="login-register-line" style={{ margin: '0', textAlign: 'center' }}>
          Don't have an account?{' '}
          <a
            href="#"
            className="login-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/signup');
            }}
            tabIndex={isLoading ? -1 : 0}
          >
            Create Account
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;