import React from 'react';
import './BackgroundVideo.css';

const BackgroundVideo = () => {
  return (
    <div className="video-container">
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src="./JARVISVID.mp4" type="video/mp4" />
      </video>
      {/* Other content goes here */}
      <div className="content">
        <h1>Welcome to My Page</h1>
      </div>
    </div>
  );
};

export default BackgroundVideo;