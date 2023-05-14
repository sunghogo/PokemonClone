// Parse asset src's from JSON data
const sources = { images: [], audio: [] };

fetch('./data/images-sources.json')
  .then(response => response.json())
  .then(paths => paths.forEach(path => sources.images.push(path)))
  .catch(err => console.log(`An error has occured: ${err}`));

fetch('./data/audio-sources.json')
  .then(response => response.json())
  .then(paths => paths.forEach(path => sources.audio.push(path)))
  .catch(err => console.log(`An error has occured: ${err}`));

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

function loadAssets(sources) {
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
