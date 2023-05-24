// Declare fs, path, directories, file suffixes
const fs = require('fs');
const path = require('path');

const directoryPaths = ['./images', './audio'];
const outputDirectory = './data';
const fileSuffix = '-sources.json';

const sourcesMainFilename = 'sources-paths.json';
const sourcesMainFilePath = path.join(outputDirectory, sourcesMainFilename);
const sourcesPaths = [];

// Iterate over each asset directory
directoryPaths.forEach(directoryPath => {
  // Read files synchronously
  const files = fs.readdirSync(directoryPath);

  // Parse files names into specified format, and push them into array for writing
  const filePaths = [];
  files.forEach(file => {
    const filePath = `${directoryPath}/${file}`; // src paths need to be in ./"" format
    filePaths.push(filePath);
  });

  // Generate output file name/path for each asset type, and push them into array for writing main source file
  const outputFilePath = path.join(
    outputDirectory,
    directoryPath.split('/').slice(-1) + fileSuffix
  );
  const outputFilePathMain = `${directoryPath}/${
    directoryPath.split('/').slice(-1) + fileSuffix
  }`;
  sourcesPaths.push(outputFilePathMain);

  // Write all the file paths into a JSON file at specified output file path
  fs.writeFileSync(outputFilePath, JSON.stringify(filePaths, null, 1));
  console.log(`${outputFilePath} generated`);
});

// Write all the sources JSON file paths into a main JSON file
fs.writeFileSync(sourcesMainFilePath, JSON.stringify(sourcesPaths, null, 1));
console.log(`${sourcesMainFilePath} generated`);
