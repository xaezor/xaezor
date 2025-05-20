import React, { useState, useEffect } from 'react';
import { useClickSound } from '../Assets/hooks/useHoverSound';

function Typewriter({ text, speed = 70, ...props }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span {...props}>{displayed}</span>;
}

const Main = () => {
  const playClickSound = useClickSound();

  return (
    <div>
      <section>
        <div className="hero" style={{ position: 'relative', zIndex: 1, width: '100vw', height: '100vh' }}>
          <div className="heroT">
            <h1 style={{ textAlign: 'center', color: 'white', width: '100%', margin: '0 auto' }}>
              Welcome to 
            </h1>
            <h2>XAEZOR</h2>
            <h2>XAEZOR</h2>
          </div>
          <p className="heroP">
            Creating the creation
          </p>
        </div>
      </section>
          
    </div>
  );
};

export default Main;