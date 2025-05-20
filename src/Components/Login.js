
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useClickSound, useKeypressSound } from '../Assets/hooks/useHoverSound';
import './Login.css';

const API_URL = process.env.REACT_APP_API_URL?.replace(/\/+$/, '') || 'http://localhost:5000';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const playClickSound = useClickSound();
  const playKeypressSound = useKeypressSound();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${API_URL}/api/login`,
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          // Optional: only needed if backend uses cookies
          // withCredentials: true
        }
      );

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      setMessage('Login successful!');
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      setMessage(
        error.response?.data?.message ||
        (error.code === 'ERR_NETWORK'
          ? 'Network error. Please check the backend URL or CORS policy.'
          : 'An error occurred during login. Please try again.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
            minLength={3}
            maxLength={20}
            onKeyDown={playKeypressSound}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            minLength={6}
            onKeyDown={playKeypressSound}
          />
        </div>
        <button type="submit" onClick={e => { playClickSound(); handleLogin(e); }} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <button type="button" onClick={() => { playClickSound(); navigate('/register'); }} disabled={isLoading}>
          Don't have an account? Sign Up
        </button>
        {message && (
          <p className={message.includes('successful') ? 'success-message' : 'error-message'}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
