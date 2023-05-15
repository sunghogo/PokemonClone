// Parse asset src's from JSON data
const srcsFilePath = './data/sources-paths.json';
const sources = { images: [], audio: [] };

function fetchAssetType(src) {
  return fetch(src)
    .then(response => response.json())
    .then(paths => {
      const type = src.split('\\').slice(-1)[0].split('-')[0];
      sources[type] = paths;
    })
    .catch(err => console.log(`An error has occured: ${err}`));
}

function fetchAssets(srcs) {
  return Promise.all(srcs.map(src => fetchAssetType(src)));
}

function fetchSources(srcsFilePath) {
  fetch(srcsFilePath)
    .then(response => response.json())
    .then(srcs => fetchAssets(srcs))
    .catch(err => console.log(`An error has occured: ${err}`));
}

function loadImagePromise(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const imgName = src.split('/').slice(-1);
    img.onload = () => {
      resolve(img);
    };
    img.onerror = reject(`${imgName} failed to load`);
    img.src = src; // Begins loading image
  });
}

function loadImages(sources) {
  Promise.all(sources.map(loadImagePromise))
    .then(images => {
      images.forEach(img => {
        console.log(img.src);
      });
    })
    .catch(err => {
      // Handle any errors that occurred while loading the images
      console.log(`An error occurred while loading the images: ${err}`);
    });
}

fetchSources(srcsFilePath);
console.log(sources);
