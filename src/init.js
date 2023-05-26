// This module initializes all the other modules the first time
import { initAssets } from './assets.js';
import { initKeys } from './keys.js';
import { initCanvas } from './canvas.js';
import { initPlayer } from './player.js';
import { initBG } from './background.js';
import { collisionsMap } from './collisions.js';
import { spawnMap } from './spawn.js';
import initResize from './resize.js';

// Load assets within module execution
async function init() {
  initCanvas();
  initKeys();
  await initAssets();
  initPlayer();
  initBG();
  initResize();
  console.log(`Initialization Complete!`);
}

export default init;
