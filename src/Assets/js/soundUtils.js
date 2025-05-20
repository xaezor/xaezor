const clickSound = new Audio('/src/Assets/sounds/scificlick.mp3');

export const playClickSound = () => {
  clickSound.currentTime = 0; // Reset the sound to start
  clickSound.play().catch(error => {
    // Handle any autoplay restrictions
    console.log('Sound play failed:', error);
  });
}; 