// This module initializes all the other modules for the first time

import { initAssets } from './assets.js';
import { initData } from './data.js';
import { initKeys } from './keys.js';
import { initCanvas } from './canvas.js';
import { initPlayer } from './player.js';
import { initBG } from './background.js';
import { initCollisions } from './collisions.js';
import { initSpawn } from './spawn.js';
import { initMovables } from './movable-objects.js';
import initResize from './resize.js';

// Initializes the game state ... ORDER MATTERS
async function init() {
  initCanvas();
  await initAssets();
  await initData();
  initPlayer();
  initBG();
  initCollisions();
  initSpawn();
  initMovables();
  initResize();
  initKeys();
  console.log(`Initialization Complete!`);
}

export default init;
