// This module handles kep mapping and press states

// Declare key press map
const keys = new Map([
  ['up', false],
  ['down', false],
  ['left', false],
  ['right', false],
]);

// Add event listeners for each key press/mapping
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

// Keys Initialization Message
console.log(`Loading keys finished`);

// Export keys map containg key press states
export default keys;
