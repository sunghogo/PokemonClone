// This modules handles the logic for player movement and rendering

import { keys } from './keys.js';
import { player } from './player.js';
import { moveMovables } from './movable-objects.js';
import { detectPlayerCollision } from './collisions.js';

// Calculates position offset due to player movement in advance
function calculateMovementOffset(key) {
  const offsetX =
    key === 'left' ? player.velocity : key === 'right' ? -player.velocity : 0;
  const offsetY =
    key === 'up' ? player.velocity : key === 'down' ? -player.velocity : 0;
  return { offsetX, offsetY };
}

// The main logic behind player movement and object repositioning
function movePlayer() {
  player.moving = false;
  keys.forEach((value, key) => {
    if (value) {
      player.moving = true;
      player.image = player.sprites[key];
      const offset = calculateMovementOffset(key);
      if (!detectPlayerCollision(offset)) moveMovables(offset);
    }
  });
}

export default movePlayer;
