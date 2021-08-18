const helper = require("../lib/sort-helper.js");
const path = require("path");

exports.organizer = organizer;
function organizer(sourcePath) {
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
  const files = helper.getImageVideoFiles(sourcePath);
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
