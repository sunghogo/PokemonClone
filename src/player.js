// This module contains all the logic regarding the player character

import { assets } from './assets.js';
import Sprite from './sprite.js';
import { canvas } from './canvas.js';
import { parseImageName } from './parse.js';

// Declare player sprite object
let player;

// Promisfying callback .find() method to find player image from assets object to be synchronous with rest of AJAX initialization
function findPlayerImage(src) {
  return new Promise((resolve, reject) => {
    const image = assets.images.objects.find(el => el.src?.includes(src));
    image ? resolve(image) : reject(image);
  });
}

// Initializes player sprite object
async function initPlayer() {
  const [playerImageDown, playerImageUp, playerImageLeft, playerImageRight] =
    await Promise.all(
      assets.images.srcs
        .filter(src => src.includes('player'))
        .map(parseImageName)
        .map(findPlayerImage)
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
