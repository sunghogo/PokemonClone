// This module contains the Boundary class that will be used to initialize and render all collision objects

import { context } from './canvas.js';

// This class is used to represent the different object sprites and their coordinates
class Boundary {
  // Dimensions of the tiles scaled to the enlarged tilemap
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

// Assets Initialization Message
console.log(`Loading boundary finished`);

// Export boundary class
export default Boundary;
