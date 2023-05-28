// This modules contains all the boundary objects and sprites that are rendered and moved

import { spawn } from './spawn.js';
import { background } from './background.js';
import { foreground } from './foreground.js';
import { collisions } from './collisions.js';
import { battleZones } from './battle-zones.js';

// Declare moveable objects array
const movables = [];

// Initializez movable objects array
function initMovables() {
  movables.push(background, foreground, ...collisions, ...battleZones);
}

export { movables, initMovables };
