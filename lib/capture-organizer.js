const path = require("path");
const helper = require("../lib/sort-helper.js");

exports.organizer = organizer;
function organizer(fullPath, targetFolder) {
  const targetPath = fullPath + targetFolder;

  if (!fs.existsSync(targetPath)) {
    fs.mkdir(targetPath, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }

  fs.readdir(fullPath, (err, files) => {
    files.forEach((fileName) => {
      if (path.extname(fileName).toLocaleLowerCase() !== ".png") return;

      const date = fileName.match("[0-9]{4}([-/ -])[0-9]{2}[-/ -][0-9]{2}");
      const dateTargetPath = targetPath + "/" + date[0];

      if (!fs.existsSync(dateTargetPath)) {
         fs.mkdir(dateTargetPath, { recursive: true }, (err) => {
           if (err) throw err;
         });
       }

      helper.sort(fileName, fullPath, dateTargetPath)
    });
  });
}
