// This modules initializes the battle zone boundary objects

import Boundary from './classes/boundary.js';
import { battleMap } from './data-handling/data.js';
import { player } from './player.js';
import { background } from './background.js';
import { detectCollision, rectangularCollisionOverlap } from './collisions.js';
import battle from './battle.js';

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
function detectPlayerBattleZoneCollision() {
  const boundary = detectCollision({
    boundaries: battleZones,
    character: player,
  });
  if (
    boundary &&
    rectangularCollisionOverlap({
      rectangle1: player,
      rectangle2: boundary,
    }) >
      (player.width * player.height) / 3
  )
    if (Math.random() < 0.03) {
      battle.initiated = true;
      return true;
    }
  return false;
}

export { battleZones, initBattleZones, detectPlayerBattleZoneCollision };
