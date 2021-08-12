const helper = require("../sort-helper.js")
const path = require('path');

exports.organizer = organizer
function organizer(fullPath){
   const needed = ['video', 'captured', 'duplicated']
   const videoPath = fullPath+ needed[0]
   const capturedPath = fullPath+ needed[1]
   const duplicatedPath = fullPath+ needed[2]

   const videoExt = ['.mp4', '.mov']
   const capturedExt = ['.aae', '.png']
   console.log(needed, fullPath)
   helper.makeDirectories(needed, fullPath);

   const editedPattern = new RegExp('^IMG_E\[0-9]')
   
   fs.readdir(fullPath, (err, files) => {
      files.forEach(fileName => {
         console.log("👀filename", fileName)
         if (videoExt.includes(path.extname(fileName).toLowerCase())){
            console.log("🍎VIDEO")
            helper.sort(fileName, fullPath, videoPath)
         } else if (capturedExt.includes(path.extname(fileName).toLowerCase())){
            console.log("🍎CAP")
            helper.sort(fileName, fullPath, capturedPath)
         } else if (editedPattern.test(fileName)){
            console.log("🍎DUP")
            const original = fileName.replace('E','')
            helper.sort(original, fullPath, duplicatedPath)
         }
      });
    });
}