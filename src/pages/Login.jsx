import '../styles/Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import showIcon from '../assets/icons/show-password.svg';
import hideIcon from '../assets/icons/hide-password.svg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    // Empty field check
    if (!username || !password) {
      setError('Please fill in all fields.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // If email format is entered, validate it
    const isEmail = username.includes('@');
    if (isEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(username)) {
        setError('Please enter a valid email address.');
        setTimeout(() => setError(''), 3000);
        return;
      }
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: username, // backend supports both email or username here
        password
      });

      const user = res.data.user;

      // Block member access
      if (user.role === 'member') {
        setError('Members are not allowed to access this system.');
        setTimeout(() => setError(''), 3000);
        return;
      }

      localStorage.setItem('user', JSON.stringify(user));
      console.log('✅ Login Success:', user);
      setError('');
      navigate('/Home');

    } catch (err) {
      console.error('❌ Login Failed:', err.response?.data);
      setError(err.response?.data?.message || 'Something went wrong.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div
      id="login-page-root"
      className="min-h-screen w-full flex items-center justify-start bg-[url('/assets/background/login-background.png')] bg-cover bg-center"
    >
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="logo fitme">FitMe</h1>

          <div className="input-group">
            <input
              type="text"
              id="username"
              placeholder="Username or Email"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={0}
              style={{ outline: 'none' }}
            >
              <img
                src={showPassword ? hideIcon : showIcon}
                alt={showPassword ? 'Hide password' : 'Show password'}
                className="toggle-icon"
              />
            </span>
          </div>

          <button type="submit" className="login-button">Log In</button>

          <div className="secondary-links">
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          {error && <p id="error-message" className="error-message visible">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;