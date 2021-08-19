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
  const result = sortFiles(files, sourcePath, necessaryPaths);
  return result;
}

function sortFiles(files, sourcePath, necessaryPaths) {
  let result = [];
  files.forEach((fileName) => {
    const temp = sortFile(fileName, sourcePath, necessaryPaths);
    if (temp != undefined) {
      result.push(temp);
    }
  });
  return result;
}

function sortFile(fileName, sourcePath, necessaryPaths) {
  let result;
  const category = matchCategory(fileName);
  if(category == undefined)return;
  
  if(category == 'duplicated'){
    fileName = fileName.replace("E", "");
  }
  result = helper.sort(fileName, sourcePath, necessaryPaths[category]);
  return result;
}

function matchCategory(fileName){
  let result;

  const extensions = {
    video: [".mp4", ".mov"],
    captured: [".aae", ".png"],
  };

  const editedPattern = new RegExp("^IMG_E[0-9]");

  let ext = path.extname(fileName).toLowerCase();
  if (editedPattern.test(fileName)) {
    result = "duplicated";
  } else {
    result = checkWhereExtBelongs(extensions, ext);
  }
  return result;
}

function checkWhereExtBelongs(extensions, ext) {
  let result;
  for (const [key, value] of Object.entries(extensions)) {
    if (value.includes(ext)) result = key;
  }
  return result;
}
