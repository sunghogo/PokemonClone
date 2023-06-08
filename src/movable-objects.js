// This modules contains all the boundary objects and sprites that are rendered and moved

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

function moveMovables({ offsetX = 0, offsetY = 0 }) {
  movables.forEach(movable => {
    movable.position.x += offsetX;
    movable.position.y += offsetY;
  });
}

export { movables, initMovables, moveMovables };
