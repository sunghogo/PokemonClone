// This module contains all the logic regarding the background

import assets from './assets.js';
import Sprite from './sprite.js';
import { canvas } from './canvas.js';

// Declare and find background image object from assets
const bgImage = assets.images.find(el =>
  el.src?.includes('pellet-town-scaled')
);

const spawnX = 1248;
const spawnY = 912;

// Declare and calculate how much the backgorund is initially offset to render centered around the spawn location
const bgOffset = {
  x: -spawnX + canvas.width / 2,
  y: -spawnY + canvas.height / 2,
};

// Declare and intialize background sprite object
const background = new Sprite({
  position: {
    x: bgOffset.x,
    y: bgOffset.y,
  },
  image: bgImage,
});

// Background Initialization message
console.log('Loading background finished');

// Export background image element, offset, and sprite object
export { bgImage, bgOffset, background };
