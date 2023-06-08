// This is the main game logic module

import init from './init.js';
import { player } from './player.js';
import { background } from './background.js';
import { collisions } from './collisions.js';
import { checkMovement } from './movement.js';
import { foreground } from './foreground.js';
import { battleZones, detectBattleZoneCollision } from './battle-zones.js';
import renderAllObjects from './render.js';

// Main game loop to update game state
function gameLoop() {
  // Check for movement key presses and moves the player
  checkMovement({ character: player, boundaries: collisions });

  renderAllObjects();

  detectBattleZoneCollision({ character: player, boundaries: battleZones })
    ? console.log('battle')
    : '';

  // Next frame
  requestAnimationFrame(gameLoop);
}

// Initialize the game state
await init();

// Start game
gameLoop();
