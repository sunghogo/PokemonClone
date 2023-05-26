// This module extracts information regarding objects from JSON tilemap data file

import { tilemapFilePath, fetchSrc } from './fetch.js';

// Map dimensionss in tiles
const mapWidth = 70;
const mapHeight = 40;

// Declare arrays that map each corresponding boundary object
const collisionsMap = [];
const spawnMap = [];

// Initialize object map arrays
async function initData() {
  const tilemapData = await fetchSrc(tilemapFilePath);

  const collisionsData = tilemapData.layers.find(
    layer => layer.name === 'Collisions'
  )?.data;
  const spawnData = tilemapData.layers.find(
    layer => layer.name === 'Spawn'
  )?.data;

  while (collisionsData.length > 0) {
    collisionsMap.push(collisionsData.splice(0, mapWidth));
  }
  while (spawnData.length > 0) {
    spawnMap.push(spawnData.splice(0, mapWidth));
  }

  console.log('Loading data finished');
}

export { spawnMap, collisionsMap, initData };
