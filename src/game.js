// This is the main game logic module

import init from './init.js';
import { player } from './player.js';
import { bgOffset, background } from './background.js';
import { collisions } from './collisions.js';
import { checkMovement } from './movement.js';

// Initialize the game state
await init();

// Main game loop to update game state
function gameLoop() {
  // Check for movement key presses and moves the player
  checkMovement();

  // Redraw images
  background.draw();
  collisions.forEach(boundary => boundary.draw());
  player.draw();

  // Next frame
  console.log('Tick');
  requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();
