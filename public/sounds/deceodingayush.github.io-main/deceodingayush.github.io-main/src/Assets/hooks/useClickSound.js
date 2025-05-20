import { useCallback } from 'react';
import { playClickSound } from '../utils/soundUtils';

export const useClickSound = () => {
  const handleClick = useCallback((callback) => {
    return (e) => {
      playClickSound();
      if (callback) {
        callback(e);
      }
    };
  }, []);

  return handleClick;
}; 