// const fs = require('fs');

// fs.readdir('./images', (err, files) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(files);
// });

const fs = require("fs");
const path = require("path");

const directoryPaths = ["./images", "./audio"];
const outputDirectory = "./data";
const fileEnding = "Sources.json";

directoryPaths.forEach((directoryPath) =>
  fs.readdir(directoryPath, (err, files) => {
    // Catch error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    // Parse string paths into specified format
    const filePaths = [];
    files.forEach((file) => {
      const filePath = `${directoryPath}/${file}`;
      filePaths.push(filePath);
    });

    // Write all the paths into a JSON file at specified output directory
    const outputFilePath = path.join(
      outputDirectory,
      directoryPath.split("/").slice(-1) + fileEnding
    );
    fs.writeFile(outputFilePath, JSON.stringify(filePaths, null, 1), (err) => {
      if (err) {
        console.log(`Error writing ${outputFilePath}`, err);
      } else {
        console.log(`${outputFilePath} written successfully`);
      }
    });
  })
);
