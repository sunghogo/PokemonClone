// This modules handles the logic for player movement and rendering

import { keys } from './keys.js';
import { player } from './player.js';
import { collisions } from './collisions.js';
import { movables } from './movable-objects.js';
import { detectPlayerCollision } from './collisions.js';

function calculatePlayerMovement() {
  player.moving = false;
  keys.forEach((value, key) => {
    if (value && key === 'up') {
      player.moving = true;
      player.image = player.sprites.up;
      if (!detectPlayerCollision({ offsetY: player.velocity }))
        movables.forEach(movable => {
          movable.position.y += player.velocity;
        });
    } else if (value && key === 'down') {
      player.moving = true;
      player.image = player.sprites.down;
      if (
        !detectPlayerCollision({
          offsetY: -player.velocity,
        })
      )
        movables.forEach(movable => {
          movable.position.y -= player.velocity;
        });
    } else if (value && key === 'left') {
      player.moving = true;
      player.image = player.sprites.left;
      if (!detectPlayerCollision({ offsetX: player.velocity }))
        movables.forEach(movable => {
          movable.position.x += player.velocity;
        });
    } else if (value && key === 'right') {
      player.moving = true;
      player.image = player.sprites.right;
      if (
        !detectPlayerCollision({
          offsetX: -player.velocity,
        })
      )
        movables.forEach(movable => {
          movable.position.x -= player.velocity;
        });
    }
  });
}

export default calculatePlayerMovement;
