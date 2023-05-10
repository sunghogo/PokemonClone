// Selector and Context
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

function setCanvas() {
  // Set canvas dimensions
  canvas.width = window.innerWidth - 4;
  canvas.height = window.innerHeight - 4;
}

function loadImages() {
  // Declare html image objects
  const bgImage = new Image();
  const playerImage = new Image();

  // Keeps pixel art sharp
  context.imageSmoothingEnabled = false;

  // Draw bg image
  bgImage.onload = () => {
    // Scaling constants
    const zoom = 2.5;
    const scaleX = canvas.width / bgImage.width;
    const scaleY = canvas.height / bgImage.height;

    context.save();
    context.scale(scaleX * zoom, scaleY * zoom);
    context.drawImage(bgImage, -canvas.width / 10, -canvas.height / 8);
    context.restore();

    // Load player image
    playerImage.src = './Assets/Images/playerDown.png';
  };

  // Draw player image
  playerImage.onload = () => {
    // Scaling constants
    const zoom = 0.7;
    const scaleX = canvas.width / bgImage.width;
    const scaleY = canvas.height / bgImage.height;

    // Draw player
    context.save();
    context.scale(scaleX * zoom, scaleY * zoom);
    context.drawImage(
      playerImage,
      canvas.width / 2 - playerImage.width / 2,
      canvas.height / 2 - playerImage.height / 2
    );
    context.restore();
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
