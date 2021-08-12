const helper = require("../lib/sort-helper.js")
const path = require('path');

exports.organizer = organizer
function organizer(sourcePath){
   const needed = ['video', 'captured', 'duplicated']
   const videoPath = sourcePath+ needed[0] + "/";
   const capturedPath = sourcePath+ needed[1] + "/";
   const duplicatedPath = sourcePath+ needed[2] + "/";

   const videoExt = ['.mp4', '.mov']
   const capturedExt = ['.aae', '.png']
   console.log(needed, sourcePath)
   helper.makeDirectories(needed, sourcePath);

   const editedPattern = new RegExp('^IMG_E\[0-9]')
   
   fs.readdir(sourcePath, (err, files) => {
      files.forEach(fileName => {
         console.log("👀filename", fileName)
         if (videoExt.includes(path.extname(fileName).toLowerCase())){
            console.log("🍎VIDEO")
            helper.sort(fileName, sourcePath, videoPath)
         } else if (capturedExt.includes(path.extname(fileName).toLowerCase())){
            console.log("🍎CAP")
            helper.sort(fileName, sourcePath, capturedPath)
         } else if (editedPattern.test(fileName)){
            console.log("🍎DUP")
            const original = fileName.replace('E','')
            helper.sort(original, sourcePath, duplicatedPath)
         }
      });
    });
}