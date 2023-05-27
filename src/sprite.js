// This module contains the Sprite class that will be used to initialize all images into Sprite objects that can be located and rendered

import { context } from './canvas.js';

class Sprite {
  constructor({ position, velocity = 0, image, frames = { max: 1 }, sprites }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.velocity = velocity;

    // For cropping sprite sheets
    this.width = this.image.width / this.frames.max;
    this.height = this.image.height;

    // For animation
    this.moving = false;
    this.sprites = sprites;
  }

  draw() {
    context.imageSmoothingEnabled = false; // Keeps pixel art sharp
    context.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );

    // Reset animation is not moving
    if (!this.moving) {
      this.frames.val = 0;
      this.frames.elapsed = 0;
      return;
    }

    // Frame check and animation cycling
    if (this.frames.max > 0) {
      this.frames.elapsed++;
    }
    if (this.frames.elapsed % 8 === 0)
      this.frames.val < this.frames.max - 1
        ? this.frames.val++
        : (this.frames.val = 0);
  }
}

export default Sprite;
