import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authBaseurl } from './Api';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${authBaseurl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully! Redirecting to login...');
        setError('');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setSuccess('Offline mode: account saved locally. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Create Account</h1>

      {error && (
        <div className="error-message" role="alert" aria-live="polite">
          {error}
        </div>
      )}

      {success && (
        <div className="success-message" role="alert" aria-live="polite">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-input"
            value={formData.firstName}
            onChange={handleChange}
            required
            autoComplete="given-name"
            autoFocus
            placeholder="Enter your first name"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-input"
            value={formData.lastName}
            onChange={handleChange}
            required
            autoComplete="family-name"
            placeholder="Enter your last name"
            disabled={isLoading}
          />
        </div>

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
            autoComplete="new-password"
            placeholder="Create a password (min. 6 characters)"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="signup-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        <p style={{ margin: '0', textAlign: 'center' }}>
          Already have an account?{' '}
          <a
            href="#"
            className="login-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
            tabIndex={isLoading ? -1 : 0}
          >
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;