// This module contains the Boundary class that will be used to initialize and render all objects other than the player and bg

import { context } from '../canvas.js';

class Boundary {
  // Dimensions of the tiles scaled to the enlarged tilemap
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw(highlight = false) {
    context.fillStyle = highlight
      ? 'rgba(255, 0, 0, 0.5)'
      : 'rgba(255, 0, 0, 0.0)';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export default Boundary;
