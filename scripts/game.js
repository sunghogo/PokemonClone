// Classes
class Sprite {
  constructor({ position, velocity, image, crop, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.crop = crop;
    this.frames = frames;
  }

  draw() {
    context.imageSmoothingEnabled = false; // Keeps pixel art sharp
    context.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
  }
}

class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw() {
    context.fillStyle = 'red';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// Functions
function setCanvasSize() {
  // Set canvas dimensions
  canvas.width = window.innerWidth - 4;
  canvas.height = window.innerHeight - 4;
}

function setCanvasColor() {
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const imgName = src.split('/').slice(-1);
    img.onload = () => {
      console.log(`${imgName} loaded`);
      resolve(img);
    };
    img.onerror = reject(`${imgName} failed to load`);
    img.src = src;
  });
}

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

// Canvas selector and context
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Initialization
setCanvasSize();
setCanvasColor();

// Declare html image objects
const bgImage = new Image();
const playerImage = new Image();

// Sources
const sources = [
  './Assets/Images/playerDown.png',
  './Assets/Images/Pellet Town Scaled.png',
];

setTimeout =
  (() => {
    Promise.all(sources.map(loadImage))
      .then(images => {
        images.forEach(img => {
          console.log(img.src);
        });
      })
      .catch(err => {
        // Handle any errors that occurred while loading the images
        console.error('An error occurred while loading the images:', err);
      });
  },
  5000);

// Load player sprite
// playerImage.src = './Assets/Images/playerDown.png';

// Declare bgOffset
let bgOffset;

// Declare sprites
let background;
let player;

// Declare boundary
const boundaries = [];

// Declare moveable objects
const movables = [];

// Declare key press map
const keys = new Map([
  ['up', false],
  ['down', false],
  ['left', false],
  ['right', false],
]);

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

for (const event of ['keydown', 'keyup']) {
  window.addEventListener(event, e => {
    const state = event === 'keydown' ? true : false;
    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        keys.set('up', state);
        break;
      case 's':
      case 'ArrowDown':
        keys.set('down', state);
        break;
      case 'd':
      case 'ArrowRight':
        keys.set('right', state);
        break;
      case 'a':
      case 'ArrowLeft':
        keys.set('left', state);
        break;
    }
  });
}
