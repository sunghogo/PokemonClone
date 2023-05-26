// This module contains all the logic regarding the background

import { assets } from './assets.js';
import Sprite from './sprite.js';
import { canvas } from './canvas.js';

const spawnX = 1248;
const spawnY = 912;

// Declare how much the backgorund is initially offset to render centered around the spawn location
const bgOffset = {};

// Declare and intialize background sprite object
let background;

// Calculate and initialize bgOffset and background sprite object
function initBG() {
  const bgImage = assets.images.find(el =>
    el.src?.includes('pellet-town-scaled')
  );

  bgOffset.x = -spawnX + canvas.width / 2;
  bgOffset.y = -spawnY + canvas.height / 2;

  background = new Sprite({
    position: {
      x: bgOffset.x,
      y: bgOffset.y,
    },
    image: bgImage,
  });
  console.log('Loading background finished');
}

export { initBG, bgOffset, background };
