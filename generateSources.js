// const fs = require('fs');

// fs.readdir('./images', (err, files) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(files);
// });

const fs = require('fs');
const path = require('path');

const directoryPaths = ['./images', './audio'];
const outputDirectory = './data';

directoryPaths.forEach(directoryPath =>
  fs.readdir(directoryPath, (err, files) => {
    // Catch error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    let filePaths = [];
    files.forEach(file => {
      filePaths.push(`.${directoryPath}/${file}`);
      console.log(file);
    });
    console.log(filePaths);

    fs.writeFile(
      path.join(
        outputDirectory,
        directoryPath.split('/').slice(-1) + 'Sources.json'
      ),
      JSON.stringify(filePaths, null, 1),
      err => {
        if (err) {
          console.log('Error writing file:', err);
        } else {
          console.log('File written successfully');
        }
      }
    );
  })
);
