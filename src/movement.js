// This modules handles the logic for player movement and rendering

import { keys } from './keys.js';
import { movables } from './movable-objects.js';
import { player } from './player.js';

function checkMovement() {
  keys.forEach((value, key, map) => {
    if (value && key === 'up')
      movables.forEach(movable => {
        movable.position.y += player.velocity;
      });
    else if (value && key === 'down')
      movables.forEach(movable => {
        movable.position.y -= player.velocity;
      });
    else if (value && key === 'left')
      movables.forEach(movable => {
        movable.position.x += player.velocity;
      });
    else if (value && key === 'right')
      movables.forEach(movable => {
        movable.position.x -= player.velocity;
      });
  });
}

export { checkMovement };
