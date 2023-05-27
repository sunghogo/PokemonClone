// This module contains all the logic regarding the player character

import { assets } from './assets.js';
import Sprite from './sprite.js';
import { canvas } from './canvas.js';

// Declare player sprite object
let player;

// Initializes player sprite object
function initPlayer() {
  const playerImageDown = assets.images.find(el =>
    el.src?.includes('player-down')
  );
  const playerImageUp = assets.images.find(el => el.src?.includes('player-up'));
  const playerImageLeft = assets.images.find(el =>
    el.src?.includes('player-left')
  );
  const playerImageRight = assets.images.find(el =>
    el.src?.includes('player-right')
  );

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
}

export { initPlayer, player };
