// This module contains all the logic regarding the player character

import assets from './assets.js';
import Sprite from './sprite.js';
import { canvas } from './canvas.js';

// Declare and find player image object from assets
const playerImage = assets.images.find(el => el.src?.includes('player-down'));

// Declare and intialize player sprite object
const player = new Sprite({
  position: {
    x: canvas.width / 2 - playerImage.width / 8,
    y: canvas.height / 2 - playerImage.height / 2,
  },
  image: playerImage,
  frames: { max: 4 },
});

// Player Initialization message
console.log('Loading player finished');

// Export player image element and sprite object
export { playerImage, player };
