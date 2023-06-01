// This is the main game logic module

import init from './init.js';
import { player } from './player.js';
import { background } from './background.js';
import { collisions } from './collisions.js';
import { checkMovement } from './movement.js';
import { foreground } from './foreground.js';
import { battleZones, detectBattleZoneCollision } from './battle-zones.js';

// Main game loop to update game state
function gameLoop() {
  console.log(player);
  // Check for movement key presses and moves the player
  checkMovement({ character: player, boundaries: collisions });

  // Redraw images
  background.draw();
  collisions.forEach(boundary => boundary.draw());
  battleZones.forEach(boundary => boundary.draw(true));
  player.draw();
  foreground.draw();

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
