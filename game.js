// Classes
class Sprite {
  constructor({ position, velocity, image, crop, zoom }) {
    this.position = position;
    this.image = image;
    this.crop = crop;
    this.zoom = zoom;
  }

  drawBG() {
    context.save();
    context.scale(this.zoom, this.zoom);
    context.drawImage(this.image, this.position.x, this.position.y);
    context.restore();
  }

  drawChar() {
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

// Canvas selector and context
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Initialization
setCanvasSize();
setCanvasColor();

// Keeps pixel art sharp
context.imageSmoothingEnabled = false;

// Declare html image objects
const bgImage = new Image();
const playerImage = new Image();

// Set src / Begin loading images
bgImage.src = './Assets/Images/Pellet Town.png';

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
  const repo = 3;
  // Update game state
  // keys.forEach((value, key, map) => {
  //   if (value && key === 'up') background.position.y -= repo;
  //   else if (value && key === 'down') background.position.y += repo;
  //   else if (value && key === 'left') background.position.x -= repo;
  //   else if (value && key === 'right') background.position.x += repo;
  // });
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
    position: { x: -bgImage.width / 4, y: -bgImage.height / 3 },
    image: bgImage,
    zoom: 4.0,
  });

  // Draw bg
  background.drawBG();

  // Load player sprite
  playerImage.src = './Assets/Images/playerDown.png';
};

playerImage.onload = () => {
  // Initialize player sprite
  player = new Sprite({
    position: {
      x: bgImage.width / 2 - playerImage.width / 5.2,
      y: bgImage.height / 2 - playerImage.height / 3,
    },
    image: playerImage,
    crop: {
      x: 0,
      y: 0,
      width: playerImage.width / 4,
      height: playerImage.height,
    },
  });

  // Draw player
  player.drawChar();

  // Start game loop after all images have loaded
  gameLoop();
};

// Event Handlers
window.addEventListener('resize', function () {
  setCanvasSize();
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
