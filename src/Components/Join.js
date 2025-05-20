import React from 'react';
import '../Assets/css/join.css';
import { useClickSound } from '../Assets/hooks/useHoverSound';

export const Join = () => {
  const playClickSound = useClickSound();

  return (
    <>
      <canvas id="particleCanvas" />
      <div className="accent-lines">
        <div>
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <div>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
      <div className="pfp" /> {/* Changed from <a><span className="pfp" /></a> */}
      <a href="#" onClick={playClickSound}>
        <span className="fixed">Join</span>
      </a>
    </>
  );
};

export default Join;
