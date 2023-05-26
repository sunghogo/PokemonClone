// This module contains all the logic regarding the player character

import { assets } from './assets.js';
import Sprite from './sprite.js';
import { canvas } from './canvas.js';

// Declare player sprite object
let player;

// Initializes player sprite object
function initPlayer() {
  const playerImage = assets.images.find(el => el.src?.includes('player-down'));
  player = new Sprite({
    position: {
      x: canvas.width / 2 - playerImage.width / 8,
      y: canvas.height / 2 - playerImage.height / 2,
    },
    image: playerImage,
    frames: { max: 4 },
  });
  console.log('Loading player finished');
}

export { initPlayer, player };
