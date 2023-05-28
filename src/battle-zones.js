// This modules initializes the battle zone boundary objects

import { battleMap } from './data.js';
import Boundary from './boundary.js';
import { background } from './background.js';

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

export { battleZones, initBattleZones };
