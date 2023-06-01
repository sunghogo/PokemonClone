// This modules initializes collision boundary objects

import Boundary from './boundary.js';
import { collisionsMap } from './data.js';
import { background } from './background.js';

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

// Calculates collision overlap between two rectangular objects
function rectangularCollisionOverlap({ rectangle1, rectangle2 }) {
  const collisionWidth =
    Math.min(
      rectangle1.position.x + rectangle1.width,
      rectangle2.position.x + rectangle2.width
    ) - Math.max(rectangle1.position.x, rectangle2.position.x);
  const collisionHeight =
    Math.min(
      rectangle1.position.y + rectangle1.height,
      rectangle2.position.y + rectangle2.height
    ) - Math.max(rectangle1.position.y, rectangle2.position.y);
  const collisionArea = collisionWidth * collisionHeight;
  return collisionArea;
}

// Calculates collision in advance for checkMovement(), and returns true if colliding
function detectCollision({ character, boundaries, offsetX = 0, offsetY = 0 }) {
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
      return boundary;
  }
  return false;
}

export {
  collisions,
  initCollisions,
  detectCollision,
  rectangularCollisionOverlap,
};
