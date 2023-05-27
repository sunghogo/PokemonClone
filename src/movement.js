// This modules handles the logic for player movement and rendering

import { keys } from './keys.js';
import { movables } from './movable-objects.js';
import { player } from './player.js';
import { detectCollision } from './collisions.js';

function checkMovement() {
  keys.forEach((value, key, map) => {
    if (value && key === 'up') {
      if (!detectCollision({ offsetY: player.velocity }))
        movables.forEach(movable => {
          movable.position.y += player.velocity;
        });
    } else if (value && key === 'down') {
      if (!detectCollision({ offsetY: -player.velocity }))
        movables.forEach(movable => {
          movable.position.y -= player.velocity;
        });
    } else if (value && key === 'left') {
      if (!detectCollision({ offsetX: player.velocity }))
        movables.forEach(movable => {
          movable.position.x += player.velocity;
        });
    } else if (value && key === 'right') {
      if (!detectCollision({ offsetX: -player.velocity }))
        movables.forEach(movable => {
          movable.position.x -= player.velocity;
        });
    }
  });
}

export { checkMovement };
