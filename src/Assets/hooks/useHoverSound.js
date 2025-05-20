import { useRef, useEffect } from 'react';

export const useHoverSound = () => {
  const audioRef = useRef(null);
  const unlockedRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio('/sounds/scificlick.mp3');

    const unlock = () => {
      if (audioRef.current && !unlockedRef.current) {
        audioRef.current.play().then(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          unlockedRef.current = true;
        }).catch(() => {});
      }
    };

    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });

    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  const playHoverSound = () => {
    if (audioRef.current && unlockedRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.log('Error playing sound:', error));
    }
  };

  return playHoverSound;
};

export const useClickSound = () => {
  const playClickSound = () => {
    const audio = new Audio('/sounds/scificlick.mp3');
    audio.currentTime = 0;
    audio.play().catch(error => console.log('Error playing sound:', error));
  };
  return playClickSound;
};

export const useKeypressSound = () => {
  const playKeypressSound = () => {
    const audio = new Audio('/sounds/keypress.mp3');
    audio.currentTime = 0;
    audio.play().catch(error => console.log('Error playing sound:', error));
  };
  return playKeypressSound;
}; 