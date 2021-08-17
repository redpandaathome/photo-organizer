const path = require("path");
const fs = require("fs")

exports.sort = sort;
function sort(fileName, sourcePath, targetPath) {
  fs.rename(sourcePath + fileName, targetPath + fileName, (err) => {
    if (err == null) {
      console.log(
        `Successfully moved ${fileName} from ${sourcePath} to ${targetPath}`
      );
      return targetPath+fileName;
    }
    if (err.code == "ENOENT") {
      console.log(`err: ${fileName} to move to ${targetPath} does not exist!`);
      return;
    }
    throw err;
  });
  return targetPath+fileName
}

exports.makeDirectories = makeDirectories;
function makeDirectories(needed, sourcePath) {
  needed.forEach((el) => {
    const tempPath = sourcePath + el;
    findOrCreateDirectory(tempPath);
  });
}

exports.renameFileToTargetDir = renameFileToTargetDir;
function renameFileToTargetDir(sourcePath, targetPath, method) {
  fs.readdir(sourcePath, (err, files) => {
    files.forEach((fileName) => {
      if (path.extname(fileName).toLocaleLowerCase() !== ".png") return;
      let date;
      switch(method){
         case 'screenshot':
            date = fileName.match("[0-9]{4}([-/ -])[0-9]{2}[-/ -][0-9]{2}");
            if (date == null) {
              console.log("⛷ Skipped %s - fileName without proper date information!", fileName)
              return
            }
            break;
         case 'daily':
            date = getCreatedDate(sourcePath, fileName);
            break;
         default:
            throw new Error("date has not been set!")
      }

      const dateTargetPath = targetPath + date[0] + "/";

      findOrCreateDirectory(dateTargetPath);

      sort(fileName, sourcePath, dateTargetPath);
    });
  });
}

exports.findOrCreateDirectory = findOrCreateDirectory;
function findOrCreateDirectory (filePath){
  if (!fs.existsSync(filePath)) {
    fs.mkdir(filePath, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }
}

function getCreatedDate(sourcePath, fileName) {
   const { birthtime } = fs.statSync(sourcePath + fileName, (err) => {
     if (err !== null) {
       console.log("birthtime err...", err);
     }
   });
   const birthtimeStr = JSON.stringify(birthtime);
 
   const date = birthtimeStr.match("[0-9]{4}([-/ -])[0-9]{2}[-/ -][0-9]{2}");
   return date;
 }