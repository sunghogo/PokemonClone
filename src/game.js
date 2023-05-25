// This is the main game logic module

// Import modules
import assets from './assets.js';
import keys from './keys.js';
import { setCanvasSize, setCanvasColor, canvas } from './canvas.js';
import Sprite from './sprite.js';
import Boundary from './sprite.js';

console.log(assets);

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

// Declare html image objects
const bgImage = new Image();
const playerImage = new Image();

// Declare bgOffset
let bgOffset;

// Declare sprites
let background;
let player;

// Declare boundary
const boundaries = [];

// Declare moveable objects
const movables = [];

// Gameloop
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
  boundaries.forEach(boundary => boundary.draw());
  player.draw();

  // Next frame
  console.log('Tick');
  requestAnimationFrame(gameLoop);
}

// Set .onload Event Handlers
bgImage.onload = () => {
  // Set bg offset
  bgOffset = {
    x: -bgImage.width / 2.86 - (49 - player.position.x),
    y: -bgImage.height / 2.16 - (-36 - player.position.y),
  };

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

  // Initialize bg sprite
  background = new Sprite({
    // Find fixed point in bg image, and offset it by the player's centered positions
    position: {
      x: bgOffset.x,
      y: bgOffset.y,
    },
    image: bgImage,
  });

  // Set movables
  movables.push(background, ...boundaries);

  // Draw bg
  background.draw();
  // Draw player
  player.draw();

  // Start game loop after all images have loaded
  gameLoop();
};

playerImage.onload = () => {
  // Initialize player sprite
  player = new Sprite({
    position: {
      x: canvas.width / 2 - playerImage.width / 8,
      y: canvas.height / 2 - playerImage.height / 2,
    },
    image: playerImage,
    frames: { max: 4 },
  });

  // Set src / Begin loading images
  bgImage.src = './Assets/Images/Pellet Town Scaled.png';
};

// Event Handlers
window.addEventListener('resize', function () {
  setCanvasSize();
  setCanvasColor();

  const resizeOffset = centerChar();
  centerMovables(resizeOffset);

  background.draw();
  player.draw();
});
