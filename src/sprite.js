// This module contains the Sprite class that will be used to initialize all images into Sprite objects that can be located and rendered

import { context } from './canvas.js';

class Sprite {
  constructor({ position, velocity = 0, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.velocity = velocity;

    // For cropping sprite sheets
    this.width = this.image.width / this.frames.max;
    this.height = this.image.height;
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

export default Sprite;
