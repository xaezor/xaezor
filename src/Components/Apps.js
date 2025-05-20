import React, { useState } from 'react'
import '../Assets/css/hstyle.css';
import '../Assets/css/appstyles.css';
import '../Assets/css/projectstyles.css';
import { Link } from 'react-router-dom';
import { useClickSound } from '../Assets/hooks/useHoverSound';
import twitter from '../Assets/css/img/ams.png';
import xarvis from '../Assets/css/img/xarviscover.jpg';
import bgmi from '../Assets/css/img/bgmi.jpeg';
import chat from '../Assets/css/img/chatapp.jpeg';
import wpa from '../Assets/css/img/wpa.jpeg';
import bannerImg from '../Assets/css/img/ARC.jpg';
import sumo from '../Assets/css/img/sumobot.png';
import ttt from '../Assets/css/img/tictactoe.png';
import rc from '../Assets/css/img/rcbot.png';

// Placeholder icons (use your own images if available)
const placeholder1 = twitter;
const placeholder2 = bgmi;
const placeholder3 = twitter;
const placeholder4 = bgmi;
const placeholder5 = twitter;
const placeholder6 = bgmi;

export const Apps = () => {
  const playClickSound = useClickSound();
  const [search, setSearch] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  // Unique app data for each category
  const sections = [
    { 
      title: 'Web Apps', 
      appList: [
        { name: 'AMS', icon: twitter, link: 'https://ams-xaezors-projects.vercel.app/' },
        { name: 'Chat App', icon: chat, link: 'https://chat-xaezors-projects.vercel.app/' },
        { name: 'Weather App', icon: wpa, link: 'https://weather-xaezors-projects.vercel.app/' }
      ] 
    },
    { 
      title: 'CS Projetcs', 
      appList: [
        { name: 'Xarvis Desktop', icon: xarvis, link: 'https://github.com/xaezor/XARVIS' },
        { name: 'Tic Tac Toe', icon: ttt, link: 'https://github.com/xaezor/tictactoe' }
      ] 
    },
    { 
      title: 'Robotic Projects', 
      appList: [
        { name: 'Sumo Bot', icon: sumo, link: 'https://sumobot-xaezors-projects.vercel.app/' },
        { name: 'RC Bot', icon: rc, link: 'https://rcbot-xaezors-projects.vercel.app/' },
        { name: 'Line Follower', icon: bgmi, link: 'https://linefollower-xaezors-projects.vercel.app/' },
        { name: 'Mouse Maze Bot', icon: bgmi, link: 'https://mousemaze-xaezors-projects.vercel.app/' }
      ] 
    },
  ];

  // Gather all unique app names for filtering
  const allApps = sections.flatMap(section => section.appList);
  const filteredApps = search
    ? allApps.filter(app => app.name.toLowerCase().includes(search.toLowerCase()))
    : allApps;

  const handleBannerClick = () => {
    setIsClicked(true);
    playClickSound();
    setTimeout(() => setIsClicked(false), 300); // Reset after animation
  };

  return (
    <div style={{ 
      background: 'transparent', 
      width: '100vw', 
      height: '100%', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginTop: '9%', 
      marginBottom: '10%'
    }}>
      {/* Banner */}
      <div 
        className="project-banner"
        onClick={handleBannerClick}
        style={{
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: isClicked ? 'scale(0.98)' : 'scale(1)',
          filter: isClicked ? 'brightness(1.2) drop-shadow(0 0 15px rgba(0, 255, 231, 0.5))' : 'none'
        }}
      >
        <a href='https://arc-os-xaezors-projects.vercel.app/'><img 
          src={bannerImg} 
          alt="Project Banner" 
          style={{
            transition: 'all 0.3s ease',
            borderRadius: '1rem'
          }}
        /></a>
      </div>

      {/* Search Bar */}
      <div className="project-search-bar">
        <input
          className="project-search-input"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="project-search-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
      </div>
      {/* Underline */}
      <div className="project-search-underline"></div>

      {/* App Categories */}
      {sections.map((section, idx) => (
        <div key={section.title} className="app-section">
          <h2 className="app-section-title">{section.title}</h2>
          <div className="app-scroll-row">
            {section.appList
              .filter(app => filteredApps.includes(app))
              .map((appItem, i) => (
                <div key={i} className="app-card">
                  {/* App Icon Only */}
                  <div className="app-card-icon-container">
                    <img src={appItem.icon} alt="App Icon" className="app-card-icon" />
                  </div>
                  {/* App Name */}
                  <div className="app-card-name">{appItem.name}</div>
                  {/* Install Button */}
                  <a 
                    href={appItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="app-card-install-btn"
                    onClick={playClickSound}
                  >
                    View
                  </a>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
