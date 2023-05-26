// This module contains functions for parsing names from src paths

// Parses HTML asset src file path into asset type
function parseAssetType(src) {
  return src.split('/').slice(-1)[0].split('-')[0];
}

// Parses HTML image src path into image name
function parseImageName(src) {
  return src.split('/').slice(-1)[0];
}

export { parseAssetType, parseImageName };
