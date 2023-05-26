// This module handles the repositioning the sprites after resuzubg the window

import { canvas, initCanvas } from './canvas.js';
import { player } from './player.js';

// Recalculates the player sprite's new centered position, and returns the offset from its old centered position
function centerChar() {
  const oldPosX = player.position.x;
  const oldPosY = player.position.y;

  player.position.x =
    canvas.width / 2 - playerImage.width / (2 * player.frames.max);
  player.position.y = canvas.height / 2 - playerImage.height / 2;

  return [player.position.x - oldPosX, player.position.y - oldPosY];
}

// Offsets all the movable object sprites by resizeOffset array
function centerMovables(resizeOffset) {
  movables.forEach(movable => {
    movable.position.x += resizeOffset[0];
    movable.position.y += resizeOffset[1];
  });
}

// Initializes window resize event handler
function initResize() {
  window.addEventListener('resize', function () {
    // Canvas element information is reset after a resizing so have to reinitialize canvas
    initCanvas();

    const resizeOffset = centerChar();
    centerMovables(resizeOffset);

    background.draw();
    player.draw();

    console.log(`Loading resize finished`);
  });
}

export default initResize;
