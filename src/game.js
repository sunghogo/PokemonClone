// This is the main game logic module

import init from './init.js';
import movePlayer from './movement.js';
import renderAllObjects from './render.js';

// Main game loop to update game state
function gameLoop() {
  // Detects and calculates player movement
  movePlayer();

  // Redraw images
  renderAllObjects();

  // Next frame
  requestAnimationFrame(gameLoop);
}

// Initialize the game state
await init();

// Start game
gameLoop();
