// This modules initializes collision boundary objects

import { collisionsMap } from './data.js';
import { bgOffset } from './background.js';
import Boundary from './boundary.js';

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
              x: i * Boundary.width + bgOffset.x,
              y: column * Boundary.height + bgOffset.y,
            },
          })
        );
    });
  });
  console.log('Loading collisions finished');
}

export { collisions, initCollisions };
