// This modules handles the logic for player movement and rendering

import { keys } from './keys.js';
import { movables } from './movable-objects.js';
import { detectCollision } from './collisions.js';

function checkMovement({ character, boundaries }) {
  character.moving = false;
  keys.forEach((value, key) => {
    if (value && key === 'up') {
      character.moving = true;
      character.image = character.sprites.up;
      if (
        !detectCollision({ offsetY: character.velocity, boundaries, character })
      )
        movables.forEach(movable => {
          movable.position.y += character.velocity;
        });
    } else if (value && key === 'down') {
      character.moving = true;
      character.image = character.sprites.down;
      if (
        !detectCollision({
          offsetY: -character.velocity,
          boundaries,
          character,
        })
      )
        movables.forEach(movable => {
          movable.position.y -= character.velocity;
        });
    } else if (value && key === 'left') {
      character.moving = true;
      character.image = character.sprites.left;
      if (
        !detectCollision({ offsetX: character.velocity, boundaries, character })
      )
        movables.forEach(movable => {
          movable.position.x += character.velocity;
        });
    } else if (value && key === 'right') {
      character.moving = true;
      character.image = character.sprites.right;
      if (
        !detectCollision({
          offsetX: -character.velocity,
          boundaries,
          character,
        })
      )
        movables.forEach(movable => {
          movable.position.x -= character.velocity;
        });
    }
  });
}

export { checkMovement };
