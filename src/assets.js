// Retrieve asset file paths stored in sources JSON files
const srcsFilePath = './data/sources-paths.json';
const sources = { images: [], audio: [] };
const images = {};

function fetchAssetType(src) {
  return fetch(src)
    .then(response => response.json())
    .then(paths => {
      const type = src.split('\\').slice(-1)[0].split('-')[0];
      for (const path of paths) sources[type].push(path);
    })
    .catch(err => console.log(`An error has occured: ${err}`));
}

function fetchAssets(srcs) {
  return Promise.all(srcs.map(src => fetchAssetType(src)));
}

// Extracts file paths from JSON source files, and loads them into sources object
function fetchSources() {
  fetch(srcsFilePath)
    .then(response => response.json())
    .then(srcs => fetchAssets(srcs))
    .catch(err => console.log(`An error has occured: ${err}`));
  return sources;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const imgName = src.split('/').slice(-1);
    img.onload = () => resolve(img);
    img.onerror = reject(`${imgName} failed to load`);
    img.src = src; // Begins loading image
  });
}

// Extracts file paths from sources.images
function loadImages() {
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

export { getSources, getImages };
