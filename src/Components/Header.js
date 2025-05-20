import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Assets/css/hstyle.css';
import { useClickSound } from '../Assets/js/useClickSound';

export const Header = () => {
  const [username, setUsername] = useState(null);
  const handleClick = useClickSound();

  useEffect(() => {
    // Fetch username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setUsername(null);
    }
  }, []);

  return (
    <div>
    <h2>
      <Link style={{
      position: 'fixed',
      top: '3%',
      left: '3%',
      padding: '20px',
      zIndex: 1000,
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      height: '45px',
      textDecoration: 'none',
      width: '140px'
    }} className="donate" to="https://patreon.com/xaezor?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink" onClick={handleClick()}>
        <span className="profile-username"><p>Sponsor</p></span>
      </Link>
      {username ? (
        <Link className="sound-button fixed-button profile-view" to="/profile" onClick={handleClick()}>
          <span className="profile-username">{username}</span>
        </Link>
      ) : (
        <Link style={{
          position: 'fixed',
          top: '3%',
          right: '3%',
          padding: '20px',
          zIndex: 1000,
          textDecoration: 'none',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          height: '45px',
          width: '140px'
        }} className="sound-button fixed-button profile-view" to="/login" onClick={handleClick()}>
          <span className="profile-username"><p>Login</p></span>
        </Link>
      )}
    </h2></div>
  );
};

export default Header;

