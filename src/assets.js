// Retrieve asset file paths stored in src JSON files
const srcsFilePath = './data/srcs.json';
const assetSrcs = { images: [], audio: [] };
const images = {};

// Retrieves src JSON file paths
async function fetchSrcs() {
  try {
    const resSrcs = await fetch(srcsFilePath);
    if (!resSrcs.ok) throw new Error('Error loading srcs.json');
    const srcs = await resSrcs.json();
    return srcs;
  } catch (err) {
    console.error(`${err.message}`);
  }
}

// Retrieves asset files src paths and loads them into assetSrcs
async function fetchAssets(srcs) {
  await srcs.forEach(async src => {
    try {
      const assetType = src.split('/').slice(-1)[0].split('-')[0];
      const resSrc = await fetch(src);
      if (!resSrc.ok) throw new Error(`Error loading ${asset} src file`);
      const assetPaths = await resSrc.json();
      assetPaths.forEach(src => assetSrcs[assetType].push(src));
    } catch (err) {
      console.error(`${err.message}`);
    }
  });
}

// Retrieves asset file paths from src JSON files and loads them into assetSrcs
async function extractAssetSrcs() {
  try {
    const srcs = await fetchSrcs();
    await fetchAssets(srcs);
  } catch (err) {
    console.error(`Loading source paths failed`);
  }
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

await extractAssetSrcs();

export { getSources, getImages };
