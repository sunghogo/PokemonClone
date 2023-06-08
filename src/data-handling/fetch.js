// This module deals with fetching JSON data from an endpoint

// Declare data file paths
const srcsFilePath = './data/srcs.json';
const tilemapFilePath = './data/pelletTown.json';

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

export { srcsFilePath, tilemapFilePath, fetchSrc };
