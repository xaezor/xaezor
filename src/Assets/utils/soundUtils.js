// Create a single audio element
const audio = new Audio();

// Set the source
audio.src = require('../sounds/scificlick.mp3');

// Function to play the sound
export const playClickSound = () => {
  // Reset the audio to the beginning
  audio.currentTime = 0;
  
  // Play the sound
  audio.play();
}; 