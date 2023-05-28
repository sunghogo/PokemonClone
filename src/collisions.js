// This modules initializes collision boundary objects

import { collisionsMap } from './data.js';
import { background } from './background.js';
import Boundary from './boundary.js';
import { player } from './player.js';

// Declare collisions array containing all the collisions boundary objects
const collisions = [];

// Initializes collisions array
function initCollisions() {
  collisionsMap.forEach((row, column) => {
    row.forEach((e, i) => {
      if (e === 1025)
        collisions.push(
          new Boundary({
            // Needs bgOffset to be rendered properly
            position: {
              x: i * Boundary.width + background.bgOffset.x,
              y: column * Boundary.height + background.bgOffset.y,
            },
          })
        );
    });
  });
  console.log('Loading collisions finished');
}

// Calculates collision and returns true if colliding
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

// Calculates collision in advance for checkMovement(), and returns true if colliding
function detectCollision({ offsetX = 0, offsetY = 0, character, boundaries }) {
  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i];
    if (
      rectangularCollision({
        rectangle1: character,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x + offsetX,
            y: boundary.position.y + offsetY,
          },
        },
      })
    )
      return true;
  }
  return false;
}

export { collisions, initCollisions, detectCollision };
