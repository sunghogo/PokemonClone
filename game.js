// Classes
class Sprite {
  constructor({ position, velocity, image, crop, zoom }) {
    this.position = position;
    this.image = image;
    this.crop = crop;
    this.zoom = zoom;
  }

  drawBG() {
    context.imageSmoothingEnabled = false; // Keeps pixel art sharp
    // context.save();
    // context.scale(this.zoom, this.zoom);
    context.drawImage(this.image, this.position.x, this.position.y);
    console.log('bg', this.position.x, this.position.y);
    // context.restore();
  }

  drawChar() {
    context.imageSmoothingEnabled = false; // Keeps pixel art sharp
    context.drawImage(
      this.image,
      this.crop.x,
      this.crop.y,
      this.crop.width,
      this.crop.height,
      this.position.x,
      this.position.y,
      this.crop.width,
      this.crop.height
    );
    console.log('player', this.position.x, this.position.y);
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

function centerChar() {
  const oldPosX = player.position.x;
  const oldPosY = player.position.y;

  player.position.x = canvas.width / 2 - playerImage.width / 8;
  player.position.y = canvas.height / 2 - playerImage.height / 2;

  return [player.position.x - oldPosX, player.position.y - oldPosY];
}

function centerBG(offset) {
  background.position.x += offset[0];
  background.position.y += offset[1];
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

// Load player sprite
playerImage.src = './Assets/Images/playerDown.png';

// Declare sprites
let background;
let player;

// Declare key presses
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
  keys.forEach((value, key, map) => {
    if (value && key === 'up') background.position.y += repo;
    else if (value && key === 'down') background.position.y -= repo;
    else if (value && key === 'left') background.position.x += repo;
    else if (value && key === 'right') background.position.x -= repo;
  });
  console.log('Tick');

  // Draw sprites
  background.drawBG();
  player.drawChar();

  // Next frame
  requestAnimationFrame(gameLoop);
}

// Set .onload Event Handlers
bgImage.onload = () => {
  // Initialize bg sprite
  background = new Sprite({
    // Find fixed point in bg image, and offset it by the player's centered positions
    position: {
      x: -bgImage.width / 2.86 - (49 - player.position.x),
      y: -bgImage.height / 2.16 - (-36 - player.position.y),
    },
    image: bgImage,
    zoom: 4.0,
  });

  // Draw player
  player.drawChar();
  // Draw bg
  background.drawBG();

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
    crop: {
      x: 0,
      y: 0,
      width: playerImage.width / 4,
      height: playerImage.height,
    },
  });

  // Set src / Begin loading images
  bgImage.src = './Assets/Images/Pellet Town Scaled.png';
};

// Event Handlers
window.addEventListener('resize', function () {
  setCanvasSize();
  setCanvasColor();

  const offset = centerChar();
  centerBG(offset);

  background.drawBG();
  player.drawChar();
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
