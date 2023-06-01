// This module contains all the logic regarding the foreground

import { findImage } from './assets.js';
import Sprite from './sprite.js';
import { background } from './background.js';

// Declare foreground sprite object
let foreground;

// Initiailize foreground sprite object based on background offset
function initFG() {
  const fgImage = findImage('foreground');

  foreground = new Sprite({
    position: {
      x: background.bgOffset.x,
      y: background.bgOffset.y,
    },
    image: fgImage,
  });
  console.log('Loading foreground finished');
}

export { initFG, foreground };
