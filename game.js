// Selector and Context
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Declare html image objects
const bgImage = new Image();
const playerImage = new Image();

// Keeps pixel art sharp
context.imageSmoothingEnabled = false;

function setCanvas() {
  // Set canvas dimensions
  canvas.width = window.innerWidth - 4;
  canvas.height = window.innerHeight - 4;
}

function loadImages() {
  // Draw bg image
  bgImage.onload = () => {
    // Scaling constants
    const zoom = 4.0;

    // Don't let the background scale with window otherwise cannot do absolute positioning with constantly changing proportions
    // const scaleX = canvas.width / bgImage.width;
    // const scaleY = canvas.height / bgImage.height;

    context.save();
    context.scale(zoom, zoom);
    context.drawImage(bgImage, -bgImage.width / 4, -bgImage.height / 3);
    context.restore();

    // Load player image
    playerImage.src = './Assets/Images/playerDown.png';
  };

  // Draw player image
  playerImage.onload = () => {
    // Draw player
    context.drawImage(
      playerImage,
      0,
      0,
      playerImage.width / 4,
      playerImage.height,
      bgImage.width / 2 - playerImage.width / 5.2,
      bgImage.height / 2 - playerImage.height / 3,
      playerImage.width / 4,
      playerImage.height
    );
  };

  // Set src / Begin loading images
  bgImage.src = './Assets/Images/Pellet Town.png';
}

// Event Handlers
// Set window resizing event listener
window.addEventListener('resize', function () {
  // Clear context
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Set canvas dimensions
  setCanvas();

  // Reload images
  loadImages();
});

// Initialization
setCanvas();

// Set background
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

loadImages();
