// This modules initializes the spawn boundary objects

import { spawnMap } from './data.js';
import Boundary from './boundary.js';

// Declare spawm array containing all the spawn boundary objects
const spawn = { spawns: [], position: { x: 0, y: 0 } };

// Calculate spawn positions IF spawners are 2x2 tiles
function calcSpawnPos() {
  spawn.spawns.forEach(boundary => {
    spawn.position.x =
      boundary.position.x > spawn.position.x
        ? boundary.position.x
        : spawn.position.x;
    spawn.position.y =
      boundary.position.y > spawn.position.y
        ? boundary.position.y
        : spawn.position.y;
  });
}

// Initializes spawn array and calculates centered spawn position
function initSpawn() {
  spawnMap.forEach((row, column) => {
    row.forEach((e, i) => {
      if (e === 1026)
        spawn.spawns.push(
          new Boundary({
            position: {
              x: i * Boundary.width,
              y: column * Boundary.height,
            },
          })
        );
    });
  });

  calcSpawnPos();
  console.log('Loading spawn finished');
}

export { spawn, initSpawn };
