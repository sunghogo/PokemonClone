// This module extracts information regarding objects from JSON tilemap data file

import { tilemapFilePath, fetchSrc } from './fetch.js';

// Map dimensionss in tiles
const mapWidth = 70;
const mapHeight = 40;

// Declare arrays that map each corresponding boundary object
const collisionsMap = [];
const spawnMap = [];
const battleMap = [];

// Initialize object map arrays
async function initData() {
  const tilemapData = await fetchSrc(tilemapFilePath);

  const collisionsData = tilemapData.layers.find(
    layer => layer.name === 'Collisions'
  )?.data;
  const spawnData = tilemapData.layers.find(
    layer => layer.name === 'Spawn'
  )?.data;
  const battleData = tilemapData.layers.find(
    layer => layer.name === 'Battle Zones'
  )?.data;

  while (collisionsData.length > 0) {
    collisionsMap.push(collisionsData.splice(0, mapWidth));
  }
  while (spawnData.length > 0) {
    spawnMap.push(spawnData.splice(0, mapWidth));
  }
  while (battleData.length > 0) {
    battleMap.push(battleData.splice(0, mapWidth));
  }

  console.log('Loading data finished');
}

export { spawnMap, collisionsMap, battleMap, initData };
