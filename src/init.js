// This module initializes all the other modules for the first time

import { initAssets } from './data-handling/assets.js';
import { initData } from './data-handling/data.js';
import { initKeys } from './keys.js';
import { initCanvas } from './canvas.js';
import { initPlayer } from './player.js';
import { initBG } from './background.js';
import { initFG } from './foreground.js';
import { initCollisions } from './collisions.js';
import { initBattleZones } from './battle-zones.js';
import { initSpawn } from './spawn.js';
import { initMovables } from './movable-objects.js';
import initResize from './resize.js';

// Initializes the game state ... ORDER MATTERS
async function init() {
  initCanvas();
  await initAssets();
  await initData();
  initSpawn();
  initPlayer();
  initBG();
  initFG();
  initCollisions();
  initBattleZones();
  initMovables();
  initResize();
  initKeys();
  console.log(`Initialization Complete!`);
}

export default init;
