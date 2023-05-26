// This module contains selector and functions regarding the HTML canvas element

// Canvas selector and context
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Set canvas dimensions to entire window
function setCanvasSize() {
  canvas.width = window.innerWidth - 4;
  canvas.height = window.innerHeight - 4;
}

// Set canvas background color to white
function setCanvasColor() {
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// (Re)Initializes canvas
function initCanvas() {
  setCanvasSize();
  setCanvasColor();
}

// Initializes canvas first time within module execution
initCanvas();

// Canvas Initialization Message
console.log(`Loading canvas finished`);

// Export canvas selector and context, and canvas init function
export { initCanvas, canvas, context };
