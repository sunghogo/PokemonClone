// This module fetches, loads, stores, and returns asset files

// Import modules
import * as Parse from './parse.js';
import { srcsFilePath, fetchSrc } from './fetch.js';

// Declare loaded assets object with asset srcs and objects
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

// Promisfies loading images and returns the created img object (img.onload and img.onerror does NOT synchronize with AJAX even with promisfying)
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const imgName = Parse.parseImageName(src);

    // Declare and initialize event handler functions to remove evnet listeners after use
    function handleLoad() {
      resolve(img);
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    }
    function handleError() {
      reject(`${imgName} failed to load`);
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    }

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    img.src = src; // Begins loading image
  });
}

// Extracts file paths from sources.images
async function loadAllImages() {
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
  await loadAllImages();
  console.log(`Loading assets finished`);
}

// Retrieves first image objects with the specified keyword or logs error
function findImage(src) {
  const image = assets.images.objects.find(img => img.src.includes(src));
  return image ? image : console.error(`Failed to find image ${src}`);
}

// Retrieves all image objects with the specified keyword or logs error
function findAllImages(srcKeyword) {
  const imgs = assets.images.objects.filter(img =>
    img.src.includes(srcKeyword)
  );
  return imgs ? imgs : console.error(`Failed to find image ${srcKeyword}`);
}

// Export assets object containing loaded asset objects
export { initAssets, findImage, findAllImages, assets };
