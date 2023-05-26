// This is the main game logic module

import init from './init.js';
import { keys } from './keys.js';
import { player } from './player.js';
import { bgOffset, background } from './background.js';
import { collisions } from './collisions.js';
import { movables } from './movable-objects.js';

// Initialize the game state
await init();

// Main game loop to update game state
function gameLoop() {
  const repo = 6;
  // Move objects
  keys.forEach((value, key, map) => {
    if (value && key === 'up')
      movables.forEach(movable => {
        movable.position.y += repo;
      });
    else if (value && key === 'down')
      movables.forEach(movable => {
        movable.position.y -= repo;
      });
    else if (value && key === 'left')
      movables.forEach(movable => {
        movable.position.x += repo;
      });
    else if (value && key === 'right')
      movables.forEach(movable => {
        movable.position.x -= repo;
      });
  });

  // Draw images
  background.draw();
  collisions.forEach(boundary => boundary.draw());
  player.draw();

  // Next frame
  console.log('Tick');
  requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();
