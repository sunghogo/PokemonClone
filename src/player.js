// This module contains all the logic regarding the player character

import { assets, findImage } from './assets.js';
import Sprite from './sprite.js';
import { canvas } from './canvas.js';

// Declare player sprite object
let player;

// Initializes player sprite object
async function initPlayer() {
  const [playerImageDown, playerImageUp, playerImageLeft, playerImageRight] =
    await Promise.all(
      assets.images.srcs.filter(src => src.includes('player')).map(findImage)
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
