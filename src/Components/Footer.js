import React from 'react';
import { Link } from 'react-router-dom';
import '../Assets/css/hstyle.css';
import { useClickSound } from '../Assets/hooks/useHoverSound';

const Footer = () => {
  const playClickSound = useClickSound();

  return (
    <div className="nav-bar">
      <Link className="sound-button" to="/" onClick={playClickSound}><p>Home</p></Link>
      <Link className="sound-button" to="/apps" onClick={playClickSound}><p>Apps</p></Link>
      <Link className="sound-button" to="/projects" onClick={playClickSound}><p>Projects</p></Link>
      <Link className="sound-button" to="/join" onClick={playClickSound}><p>Join</p></Link>
    </div>
  );
};

export default Footer;
