// This modules initializes the spawn boundary objects

import { spawnMap } from './data.js';
import Boundary from './boundary.js';

// Declare spawm array containing all the spawn boundary objects
const spawn = [];

// Initializes collisions array
function initSpawn() {
  spawnMap.forEach((row, column) => {
    row.forEach((e, i) => {
      if (e === 1026)
        spawn.push(
          new Boundary({
            position: {
              x: i * Boundary.width,
              y: column * Boundary.height,
            },
          })
        );
    });
  });
  console.log('Loading spawn finished');
}

export { spawn, initSpawn };
