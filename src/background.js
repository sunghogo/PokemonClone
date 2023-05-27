// This module contains all the logic regarding the background

import { assets } from './assets.js';
import Sprite from './sprite.js';
import { canvas } from './canvas.js';
import { spawn } from './spawn.js';

// Declare and intialize background sprite object
let background;

// Calculate and initialize bgOffset and background sprite object
function initBG() {
  const bgImage = assets.images.find(el =>
    el.src?.includes('pellet-town-scaled')
  );

  // Declare and calculate how much the background is initially offset to render bg and fg centered around the spawn location
  const bgOffset = {
    x: -spawn.position.x + canvas.width / 2,
    y: -spawn.position.y + canvas.height / 2,
  };

  background = new Sprite({
    position: {
      x: bgOffset.x,
      y: bgOffset.y,
    },
    image: bgImage,
  });
  background.bgOffset = { ...bgOffset };

  console.log('Loading background finished');
}

export { initBG, background };
