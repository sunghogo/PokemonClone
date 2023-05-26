// This is the main game logic module

// Import modules
import init from './init.js';
import { keys } from './keys.js';
import Boundary from './boundary.js';
import { player } from './player.js';
import { bgOffset, background } from './background.js';
import { collisionsMap } from './collisions.js';
import { spawnMap } from './spawn.js';
import './resize.js';

await init();

// Declare boundary
const boundaries = [];

// Declare moveable objects
const movables = [];

// Main game loop
function gameLoop() {
  const repo = 6;
  // Update game state
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
  // #FIXME
  // boundaries.forEach(boundary => boundary.draw());
  player.draw();

  // Next frame
  console.log('Tick');
  requestAnimationFrame(gameLoop);
}

// Start game
// Set Collisions
collisionsMap.forEach((row, column) => {
  row.forEach((e, i) => {
    if (e === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: i * Boundary.width + bgOffset.x,
            y: column * Boundary.height + bgOffset.y,
          },
        })
      );
  });
});

// Set spawn
const spawn = [];

// #FIXME Find bgOffset coords by finding center of spawn coords
// Set spawn
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

spawn.forEach(e => console.log(e.position));

// Set movables
movables.push(background, ...boundaries);

gameLoop();
