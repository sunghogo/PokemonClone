// This module fetches, loads, and stores asset files

// Declare src paths and loaded asset objects
const srcsFilePath = './data/srcs.json';
const assetSrcs = { images: [], audio: [] };
const images = {};

// Parses HTML asset src path into asset type
function parseAssetType(str) {
  return str.split('/').slice(-1)[0].split('-')[0];
}

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
    const assetType = parseAssetType(src);
    const assetPaths = await fetchSrc(src);
    assetPaths.forEach(src => assetSrcs[assetType].push(src));
  } catch (err) {
    console.error(`${err.message}`);
  }
}

// Loads all assets srcs into assetSrcs object
async function loadAllAssetSrcs() {
  try {
    const srcs = await fetchSrc(srcsFilePath);
    srcs.forEach(async src => await loadAssetSrc(src));
  } catch (err) {
    console.error(`Loading assets' src paths failed`);
  }
}

// Loads images and returns the created img object
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const imgName = src.split('/').slice(-1)[0];
    img.onload = () => resolve(img);
    img.onerror = reject(`${imgName} failed to load`);
    img.src = src; // Begins loading image
  });
}

// Extracts file paths from sources.images
async function loadImages() {
  console.log(sources.images);
  sources.images.map(src => console.log(src));
  Promise.all(sources.images.map(loadImage))
    .then(images => {
      console.log(images);
      // images.forEach(img => {
      //   console.log(img.src);
      // });
    })
    .catch(err => {
      console.log(`An error occurred while loading the images: ${err}`);
    });
  return images;
}

// Loads sources object if it is not properly initialized and returns it
function getSources() {
  return Object.keys(sources)
    .map(type => sources[type].length === 0)
    .reduce((acc, typeEmpty) => acc && !typeEmpty, true)
    ? sources
    : fetchSources();
}

// Loads images object if it is not properly initialized and returns it
function getImages() {
  return Object.keys(images).length === 0 ? loadImages() : images;
}

await loadAllAssetSrcs();

export { getSources, getImages };
