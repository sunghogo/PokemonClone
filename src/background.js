// This module contains all the logic regarding the background

import assets from './assets.js';
import Sprite from './sprite.js';
// import { canvas } from './canvas.js';
import { player } from './player.js';

// Declare and find player image object from assets
const bgImage = assets.images.find(el =>
  el.src?.includes('pellet-town-scaled')
);

// Declare bgOffset
const bgOffset = {
  x: -bgImage.width / 2.86 - (49 - player.position.x),
  y: -bgImage.height / 2.16 - (-36 - player.position.y),
};

// Declare and intialize background sprite object
const background = new Sprite({
  // Find fixed point in bg image, and offset it by the player's centered positions
  position: {
    x: bgOffset.x,
    y: bgOffset.y,
  },
  image: bgImage,
});

// Player Initialization message
console.log('Loading background finished');

// Export player image element and sprite object
export { bgImage, bgOffset, background };
