const helper = require("../lib/sort-helper.js");
const path = require("path");
const fs = require("fs");
const { file } = require("mock-fs/lib/filesystem");

exports.getImageVideoFiles = getImageVideoFiles;
function getImageVideoFiles(sourcePath) {
  const files = fs.readdirSync(
    sourcePath,
    { withFileTypes: true },
    (err, fileName) => {
      if (err !== null) {
        console.log("err! ", err);
        return;
      }
    }
  );
  const fileNames = files.filter((el) => el.isFile()).map((el) => el.name);
  return fileNames;
}

exports.getImageVideoFullPaths = getImageVideoFullPaths;
function getImageVideoFullPaths(sourcePath, files) {
  let result = [];
  const imageExt = [".jpg", ".png", ".aae", ".mp4", ".mov"];
  files.forEach((el) => {
    if (imageExt.includes(path.extname(el).toLowerCase())) {
      result.push(sourcePath + el);
    }
  });
  return result;
}

exports.organizer = organizer;
function organizer(sourcePath) {
  fs.readdir(sourcePath, (err, file) => {
    console.log("- file:", file);
  });
  const neededFolders = ["video", "captured", "duplicated"];
  const necessaryPaths = makeNecessaryPaths(neededFolders, sourcePath);

  helper.makeDirectories(neededFolders, sourcePath);

  // simple test-purpose without messing with fs mock module
  const result = sortByTargetPathByEllie(sourcePath, necessaryPaths);
  return result;
}

function makeNecessaryPaths(neededFolders, sourcePath) {
  let result = {};
  neededFolders.forEach((el) => {
    result[el] = sourcePath + el + "/";
  });
  return result;
}

function sortByTargetPathByEllie(sourcePath, necessaryPaths) {
  const files = getImageVideoFiles(sourcePath);
  const result = takeCareOfMomCat(files, sourcePath, necessaryPaths);
  return result;
}

function takeCareOfMomCat(files, sourcePath, necessaryPaths) {
  let result = [];
  files.forEach((fileName) => {
    const temp = takeCareOfCat(fileName, sourcePath, necessaryPaths);
    if (temp != undefined ){
      result.push(temp);
    }
  });
  return result;
}

function takeCareOfCat(fileName, sourcePath, necessaryPaths) {
  const videoExt = [".mp4", ".mov"];
  const capturedExt = [".aae", ".png"];
  const editedPattern = new RegExp("^IMG_E[0-9]");

  let changedPath;
  if (videoExt.includes(path.extname(fileName).toLowerCase())) {
    changedPath = helper.sort(fileName, sourcePath, necessaryPaths.video);
  } else if (capturedExt.includes(path.extname(fileName).toLowerCase())) {
    changedPath = helper.sort(fileName, sourcePath, necessaryPaths.captured);
  } else if (editedPattern.test(fileName)) {
    const original = fileName.replace("E", "");
    changedPath = helper.sort(original, sourcePath, necessaryPaths.duplicated);
  }

  return changedPath;
}
