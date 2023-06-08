// Import CommonJS fs and path modules for navigating and extracting src paths
const fs = require('fs');
const path = require('path');

// Declare directories and output file names
const inputDir = './assets';
const assetDirs = [`${inputDir}/images`, `${inputDir}/audio`];
const outputDir = './data';
const srcFileSuffix = '-srcs.json';

// Declare directory and file name for main srcs file
const srcs = [];
const srcsFilename = 'srcs.json';
const srcsFilePath = path.join(outputDir, srcsFilename);

// Iterate over each asset directory
assetDirs.forEach(dir => {
  // Read file names in each asset directory synchronously
  const files = fs.readdirSync(dir);

  // Parse files names into specified format, and push them into array for writing
  const filePaths = [];
  files.forEach(file => {
    const filePath = `${dir}/${file}`;
    filePaths.push(filePath);
  });

  // Generate output file name/path for each asset type, and push them into array for writing main source file
  const srcFilePath = path.join(
    outputDir,
    dir.split('/').slice(-1) + srcFileSuffix
  );
  const srcFilePathHTML = `${outputDir}/${
    dir.split('/').slice(-1) + srcFileSuffix
  }`;
  srcs.push(srcFilePathHTML);

  // Write all the file paths into a JSON file at specified output file path
  fs.writeFileSync(srcFilePath, JSON.stringify(filePaths, null, 1));
  console.log(`${srcFilePath} generated`);
});

// Write all the sources JSON file paths into a main JSON file
fs.writeFileSync(srcsFilePath, JSON.stringify(srcs, null, 1));
console.log(`${srcsFilePath} generated`);
