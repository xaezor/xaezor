import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../Assets/css/Profile.module.css';
import { useClickSound, useKeypressSound } from '../Assets/hooks/useHoverSound';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Modify = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const playClickSound = useClickSound();
  const playKeypressSound = useKeypressSound();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');
      
      if (!token || !storedUsername) {
        setMessage('Please log in to modify your profile');
        navigate('/login');
        return;
      }

      setUsername(storedUsername);

      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUser(storedUser);
          setBio(storedUser.bio || '');
        }
      } catch (error) {
        setMessage('Error fetching user data: ' + error.message);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleProfilePictureClick = () => {
    document.getElementById('profilePictureInput').click();
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in to update your profile');
      navigate('/login');
      return;
    }

    console.log('Token being sent:', token);

    const formData = new FormData();
    if (profilePicture) {
      console.log('Uploading profile picture:', profilePicture);
      formData.append('profilePicture', profilePicture);
    } else {
      console.log('No profile picture selected');
    }
    formData.append('bio', bio);

    try {
      const response = await axios.put(`${API_URL}/api/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(response.data.user);
      setBio(response.data.user.bio);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage(response.data.message);
      setProfilePicture(null);
      setTimeout(() => navigate('/profile'), 1000);
    } catch (error) {
      console.error('Profile update error:', error);
      if (error.response) {
        setMessage(`Server error: ${error.response.status} - ${error.response.data?.error || 'No error message provided'}`);
      } else if (error.request) {
        setMessage('No response received from server. Check if the backend is running.');
      } else {
        setMessage('Error setting up request: ' + error.message);
      }
    }
  };

  const handleGoBack = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <div className={styles.profilePage} />
      <div className={styles.content}>
        <button onClick={e => { playClickSound(); handleGoBack(e); }} className={styles['fixed-button']}>Go Back</button>
        <div onClick={handleProfilePictureClick} style={{ cursor: 'pointer' }}>
          {user && user.profilePicture && user.profilePicture !== 'default.png' ? (
            <img src={`${API_URL}${user.profilePicture}`} alt="Profile" className={styles.pfp} />
          ) : (
            <span className={styles.pfp}>Upload Picture</span>
          )}
          <input
            id="profilePictureInput"
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            style={{ display: 'none' }}
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </div>
        <div>
          <span className={styles['fixed-button1']}>UID: {username}</span>
        </div>
        <div>
          <span className={styles['fixed-button2']}>Rank: {user ? user.rank : 'User'}</span>
        </div>
        <div>
          <span className={styles['fixed-button3']}>
            About Me:
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength="500"
              style={{ width: '100%', marginTop: '5px' }}
              onKeyDown={playKeypressSound}
            />
          </span>
        </div>
        <button onClick={e => { playClickSound(); handleLogout(e); }} className={styles['fixed-button4']}>Logout</button>
        <button onClick={e => { playClickSound(); handleProfileUpdate(e); }} className={styles['fixed-button5']}>Save Changes</button>
      </div>
      {message && <p>{message}</p>}
    </>
  );
};

export default Modify;
