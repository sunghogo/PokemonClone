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
    let filePaths = [];
    files.forEach((file) => {
      filePaths.push(`${directoryPath}/${file}`);
    });

    // Write all the paths into a JSON file at specified output directory
    fs.writeFile(
      path.join(
        outputDirectory,
        directoryPath.split("/").slice(-1) + fileEnding
      ),
      JSON.stringify(filePaths, null, 1),
      (err) => {
        if (err) {
          console.log("Error writing file:", err);
        } else {
          console.log("File written successfully");
        }
      }
    );
  })
);
