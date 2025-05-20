import React, { useState } from 'react';
import '../Assets/css/hstyle.css';
import '../Assets/css/projectstyles.css';
import { useClickSound } from '../Assets/hooks/useHoverSound';
import bannerImg from '../Assets/css/img/ARC.jpg';
import card1 from '../Assets/css/img/xarviscover.png';
import card2 from '../Assets/css/img/xpediacover.png';
import card3 from '../Assets/css/img/xsocietycover.png';
import card4 from '../Assets/css/img/robotics.png';

const projects = [
  { title: 'XARVIS', img: card1 },
  { title: 'X Pedia', img: card2 },
  { title: 'X Society', img: card3 },
  { title: 'Robotics', img: card4 },
];

export const Projects = () => {
  const playClickSound = useClickSound();
  const [search, setSearch] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const handleBannerClick = () => {
    setIsClicked(true);
    playClickSound();
    setTimeout(() => setIsClicked(false), 300); // Reset after animation
  };

  const filteredProjects = search
    ? projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    : projects;

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
      {/* Project Cards Row */}
      <div className="project-cards-row">
        {filteredProjects.map((project, idx) => (
          <div className="project-card" key={project.title}>
            <img src={project.img} alt={project.title} className="project-card-img" />
            <div className="project-card-title">{project.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Projects;
