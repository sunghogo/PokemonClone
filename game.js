// Selector and Context
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

function setCanvas() {
  // Set canvas dimensions
  canvas.width = window.innerWidth - 4;
  canvas.height = window.innerHeight - 4;
}

setCanvas();

function loadBG() {
  // Images
  const image = new Image();
  image.src = './Assets/Images/Pellet Town.png';
  console.log(canvas.height, canvas.width);
  image.onload = () => {
    const scaleX = (canvas.width / image.width) * 4;
    const scaleY = (canvas.height / image.height) * 4;
    console.log(scaleX, scaleY);
    context.save();
    context.scale(scaleX, scaleY);
    context.drawImage(image, 0, 0);
    context.restore();
  };
}

loadBG();

// Set window resizing event listener
window.addEventListener('resize', function () {
  // Set canvas dimensions
  setCanvas();

  // Reload images
  loadBG();
});

// Set background
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);
