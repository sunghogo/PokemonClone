// This module fetches, loads, stores, and returns asset files

// Import modules
import * as Parse from './parse.js';
import { srcsFilePath, fetchSrc } from './fetch.js';

// Declare asset src paths object and loaded assets object
const assets = {
  images: { srcs: [], objects: [] },
  audio: { srcs: [], objects: [] },
};

// Retrieves asset src paths and loads them into asset.srcs object
async function loadAssetSrc(src) {
  try {
    const assetType = Parse.parseAssetType(src);
    const assetPaths = await fetchSrc(src);
    for (const path of assetPaths) assets[assetType].srcs.push(path);
  } catch (err) {
    console.error(`${err.message}`);
  }
}

// Loads all assets srcs into asset.srcs object
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
    const imgs = await Promise.all(
      assets.images.srcs.map(src => loadImage(src))
    );
    assets.images.objects = [...imgs];
  } catch (err) {
    console.error(`${err.message}`);
  }
}

// Initializes and loads all assets
async function initAssets() {
  await loadAllAssetSrcs();
  await loadImages();
  console.log(`Loading assets finished`);
}

// Promisfying callback .find() method to find image from assets object in other modules to be synchronous with rest of AJAX initialization
function findImage(src) {
  return new Promise((resolve, reject) => {
    const image = assets.images.objects.find(el => el.src?.includes(src));
    image ? resolve(parseImageName(image)) : reject(image);
  });
}

// Export assets object containing loaded asset objects
export { initAssets, findImage, assets };
