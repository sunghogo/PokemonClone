// This modules initializes the battle zone boundary objects

import Boundary from './boundary.js';
import { battleMap } from './data.js';
import { background } from './background.js';
import { detectCollision } from './collisions.js';

// Declare spawm array containing all the spawn boundary objects
const battleZones = [];

// Initializes spawn array and calculates centered spawn position
function initBattleZones() {
  battleMap.forEach((row, column) => {
    row.forEach((e, i) => {
      if (e === 1025)
        battleZones.push(
          new Boundary({
            position: {
              x: i * Boundary.width + background.bgOffset.x,
              y: column * Boundary.height + background.bgOffset.y,
            },
          })
        );
    });
  });

  console.log('Loading battle zones finished');
}

// Detects if player is currently inside a battle zone
function detectBattleZoneCollision({
  boundaries: battleZones,
  character: player,
}) {
  if (
    detectCollision({
      boundaries: battleZones,
      character: player,
    })
  )
    return true;
  return false;
}

export { battleZones, initBattleZones, detectBattleZoneCollision };
