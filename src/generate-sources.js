// Declare fs, path, directories, file suffixes
const fs = require('fs');
const path = require('path');

const directoryPaths = ['./images', './audio'];
const outputDirectory = './data';
const fileSuffix = '-sources.json';

const sourcesPathsFileName = 'sources-paths.json';
const sourcesPathsFilePath = path.join(outputDirectory, sourcesPathsFileName);
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

  // Generate output file name/path for each asset type, and push them into array for writing master source file
  const outputFilePath = path.join(
    outputDirectory,
    directoryPath.split('/').slice(-1) + fileSuffix
  );
  sourcesPaths.push(outputFilePath);

  // Write all the file paths into a JSON file at specified output file path
  fs.writeFileSync(outputFilePath, JSON.stringify(filePaths, null, 1));
  console.log(`${outputFilePath} generated`);
});

// Write all the sources JSON file paths into a master JSON file
fs.writeFileSync(sourcesPathsFilePath, JSON.stringify(sourcesPaths, null, 1));
console.log(`${sourcesPathsFilePath} generated`);
