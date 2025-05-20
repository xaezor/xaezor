import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../Assets/css/Profile.module.css';
import { useClickSound } from '../Assets/hooks/useHoverSound';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const playClickSound = useClickSound();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');
      
      if (!token || !storedUsername) {
        setMessage('Please log in to view your profile');
        navigate('/login');
        return;
      }

      setUsername(storedUsername);

      try {
        console.log('Fetching user data from:', `${API_URL}/api/profile`);
        console.log('Token:', token);
        const response = await axios.get(`${API_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log('API Response:', response);
        if (response.data) {
          console.log('Received user data:', response.data);
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        } else {
          setMessage('No user data received');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response) {
          console.log('Error response:', error.response.data);
          console.log('Error status:', error.response.status);
          setMessage(`Error fetching user data: ${error.response.status} - ${error.response.data?.message || 'No error message provided'}`);
        } else if (error.request) {
          console.log('No response received:', error.request);
          setMessage('No response received from server. Check if the backend is running at ' + API_URL);
        } else {
          console.log('Error setting up request:', error.message);
          setMessage('Error setting up request: ' + error.message);
        }
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleModify = () => {
    navigate('/modify');
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profilePage} />
      <div className={styles.content}>
        <button onClick={e => { playClickSound(); navigate('/'); }} className={styles['fixed-button']}>Go Back</button>
        <div>
          {user && user.profilePicture && user.profilePicture !== 'default.png' ? (
            <img src={user.profilePicture} alt="Profile" className={styles.pfpx} />
          ) : (
            <div>
              <span className={styles.pfpx} />
            </div>
          )}
        </div>
        <div>
          <span className={styles['pfparc']}> </span>
        </div>
        <div>
          <span className={styles['fixed-button1']}>UID: {username}</span>
        </div>
        <div>
          <span className={styles['fixed-button2']}>Rank: {user ? user.rank : 'User'}</span>
        </div>
        <div>
          <span className={styles['fixed-button3']}>About Me: {user ? user.bio || 'No bio set' : 'No bio set'}</span>
        </div>
        <button onClick={e => { playClickSound(); handleLogout(); }} className={styles['fixed-button4']}>Logout</button>
        <button onClick={e => { playClickSound(); handleModify(); }} className={styles['fixed-button5']}>Modify</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
