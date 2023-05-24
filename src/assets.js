// This module fetches, loads, stores, and returns asset files

// Import modules
import * as Parse from './parse.js';

// Declare src paths object and loaded asset objects
const srcsFilePath = './data/srcs.json';
const assetSrcs = { images: [], audio: [] };
const assets = { images: [], audio: [] };

// Extracts data/src paths stored in src.json files
async function fetchSrc(src) {
  try {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`Failed loading ${src} file`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`${err.message}`);
  }
}

// Retrieves asset src paths and loads them into assetSrcs object
async function loadAssetSrc(src) {
  try {
    const assetType = Parse.parseAssetType(src);
    const assetPaths = await fetchSrc(src);
    for (const path of assetPaths) assetSrcs[assetType].push(path);
  } catch (err) {
    console.error(`${err.message}`);
  }
}

// Loads all assets srcs into assetSrcs object
async function loadAllAssetSrcs() {
  try {
    const srcs = await fetchSrc(srcsFilePath);
    await Promise.all(srcs.map(src => loadAssetSrc(src)));
  } catch (err) {
    console.error(`${err.message}`);
  }
}

// Loads images and returns the created img object
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const imgName = Parse.parseImageName(src);
    img.onload = resolve(img);
    img.onerror = reject(`${imgName} failed to load`);
    img.src = src; // Begins loading image
  });
}

// Extracts file paths from sources.images
async function loadImages() {
  try {
    const imgs = await Promise.all(assetSrcs.images.map(src => loadImage(src)));
    assets.images = [...imgs];
  } catch (err) {
    console.error(`${err.message}`);
  }
}

// Load assets within module execution
await loadAllAssetSrcs();
await loadImages();
console.log(`Loading Assets Finished`);

// Export assets object containing loaded asset objects
export default assets;
