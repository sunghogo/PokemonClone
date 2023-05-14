// Declare fs, path, directories, file suffixes
const fs = require('fs');
const path = require('path');

const directoryPaths = ['./images', './audio'];
const outputDirectory = './data';
const fileSuffix = '-sources.json';

// Iterate over each src directory
directoryPaths.forEach(directoryPath =>
  fs.readdir(directoryPath, (err, files) => {
    // Catch 1st error
    if (err) return console.log(`${err}`);

    // Parse string paths into specified format
    const filePaths = [];
    files.forEach(file => {
      const filePath = `${directoryPath}/${file}`;
      filePaths.push(filePath);
    });

    // Write all the paths into a JSON file at specified output directory
    const outputFilePath = path.join(
      outputDirectory,
      directoryPath.split('/').slice(-1) + fileSuffix
    );
    fs.writeFile(outputFilePath, JSON.stringify(filePaths, null, 1), err => {
      // Catch 2nd error
      if (err) return console.log(`${err}`);
      else console.log(`${outputFilePath} written successfully`);
    });
  })
);
