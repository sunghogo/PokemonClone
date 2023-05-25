// This is the main game logic module

// Import modules
import assets from './assets.js';
import keys from './keys.js';
import { setCanvasSize, setCanvasColor, canvas, context } from './canvas.js';
import Sprite from './sprite.js';
import Boundary from './sprite.js';
import { playerImage, player } from './player.js';
import { bgImage, bgOffset, background } from './background.js';
import { collisionsMap } from './collisions.js';

// Functions
function centerChar() {
  const oldPosX = player.position.x;
  const oldPosY = player.position.y;

  player.position.x = canvas.width / 2 - playerImage.width / 8;
  player.position.y = canvas.height / 2 - playerImage.height / 2;

  return [player.position.x - oldPosX, player.position.y - oldPosY];
}

function centerMovables(resizeOffset) {
  movables.forEach(movable => {
    movable.position.x += resizeOffset[0];
    movable.position.y += resizeOffset[1];
  });
}

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

// Set movables
movables.push(background, ...boundaries);

gameLoop();

// Event Handlers
window.addEventListener('resize', function () {
  setCanvasSize();
  setCanvasColor();

  const resizeOffset = centerChar();
  centerMovables(resizeOffset);

  background.draw();
  player.draw();
});
