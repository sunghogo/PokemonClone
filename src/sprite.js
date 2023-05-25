// This module contains the Sprite class that will be used to initialize all images into Sprite objects that can be located and rendered

class Sprite {
  constructor({ position, velocity, image, crop, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.crop = crop;
    this.frames = frames;
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

// Assets Initialization Message
console.log(`Loading Sprite finished`);

// Export Sprite class
export default Sprite;
