// Declare fs, path, directories, file suffixes
const fs = require('fs');
const path = require('path');

const directoryPaths = ['./images', './audio'];
const outputDirectory = './data';
const fileSuffix = '-sources.json';

const sourcesPathsFileName = 'sources-paths.json';
const sourcesPathsFilePath = path.join(outputDirectory, sourcesPathsFileName);
const sourcesPaths = [];

// Iterate over each src directory
directoryPaths.forEach(directoryPath =>
  fs.readdir(directoryPath, (err, files) => {
    // Catch 1st error
    if (err) return console.log(`${err}`);

    // Parse string paths into specified format
    const filePaths = [];
    files.forEach(file => {
      const filePath = `${directoryPath}/${file}`; // src paths need to be in ./"" format
      filePaths.push(filePath);
    });

    // Write all the paths into a JSON file at specified output directory, and then add this JSON file path to output file
    const outputFilePath = path.join(
      outputDirectory,
      directoryPath.split('/').slice(-1) + fileSuffix
    );
    fs.writeFile(outputFilePath, JSON.stringify(filePaths, null, 1), err => {
      // Catch 2nd error
      if (err) return console.log(`${err}`);
      else {
        sourcesPaths.push(outputFilePath);
        console.log(`${outputFilePath} written successfully`);
      }
    });
  })
);

setTimeout(
  _ =>
    fs.writeFile(
      sourcesPathsFilePath,
      JSON.stringify(sourcesPaths, null, 1),
      err => {
        // Catch 2nd error
        if (err) return console.log(`${err}`);
        else {
          console.log(`${sourcesPathsFilePath} written successfully`);
        }
      }
    ),
  500
);
