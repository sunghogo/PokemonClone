// This module contains all the logic regarding the player character

import { findAllImages } from './assets.js';
import Sprite from './sprite.js';
import { canvas } from './canvas.js';

// Declare player sprite object
let player;

// Initializes player sprite object
function initPlayer() {
  const [playerImageDown, playerImageLeft, playerImageRight, playerImageUp] =
    findAllImages('player');

  player = new Sprite({
    position: {
      x: canvas.width / 2 - playerImageDown.width / 8,
      y: canvas.height / 2 - playerImageDown.height / 2,
    },
    image: playerImageDown,
    velocity: 4,
    frames: { max: 4 },
    sprites: {
      up: playerImageUp,
      down: playerImageDown,
      left: playerImageLeft,
      right: playerImageRight,
    },
  });
  console.log(`Loading player finished`);
}

export { initPlayer, player };
