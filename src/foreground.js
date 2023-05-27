// This module contains all the logic regarding the foreground

import { assets } from './assets.js';
import Sprite from './sprite.js';
import { bgOffset } from './background.js';

// Declare foreground sprite object
let foreground;

console.log(bgOffset);
// Initiailize foreground sprite object based on background offset
function initFG() {
  const fgImage = assets.images.find(el => el.src?.includes('foreground'));

  foreground = new Sprite({
    position: {
      x: bgOffset.x,
      y: bgOffset.y,
    },
    image: fgImage,
  });
  console.log('Loading foreground finished');
}

export { initFG, foreground };
