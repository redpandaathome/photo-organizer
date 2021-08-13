const path = require("path");


exports.sort = sort;
function sort(fileName, sourcePath, targetPath) {
  console.log(
    "🦜 Sorting... fileName:",
    fileName,
    ", sourcePath:",
    sourcePath,
    ", targetPath:",
    targetPath
  );
  fs.rename(sourcePath + fileName, targetPath + fileName, (err) => {
    if (err == null) {
      console.log(
        `Successfully removed to ${targetPath} - fileName: ${fileName}`
      );
      return;
    }
    if (err.code == "ENOENT") {
      console.log(`err: ${fileName} to move to ${targetPath} does not exist!`);
      return;
    }
    throw err;
  });
}

exports.makeDirectories = makeDirectories;
function makeDirectories(needed, sourcePath) {
  needed.forEach((el) => {
    const tempPath = sourcePath + el;
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath);
    }
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
            break;
         case 'daily':
            date = getCreatedDate(sourcePath, fileName);
            break;
         default:
            throw new Error("date has not been set!")
      }

      const dateTargetPath = targetPath + date[0] + "/";

      if (!fs.existsSync(dateTargetPath)) {
        fs.mkdir(dateTargetPath, { recursive: true }, (err) => {
          if (err) throw err;
        });
      }

      sort(fileName, sourcePath, dateTargetPath);
    });
  });
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

exports.makeOneDirectory = makeOneDirectory;
function makeOneDirectory(targetPath){
   if (!fs.existsSync(targetPath)) {
      fs.mkdir(targetPath, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }
}