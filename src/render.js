import { background } from './background.js';
import { collisions } from './collisions.js';
import { battleZones } from './battle-zones.js';
import { player } from './player.js';
import { foreground } from './foreground.js';

function renderAllObjects() {
  background.draw();
  collisions.forEach(boundary => boundary.draw());
  battleZones.forEach(boundary => boundary.draw());
  player.draw();
  foreground.draw();
}

export default renderAllObjects;
