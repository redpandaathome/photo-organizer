fs = require("fs");
const method = process.argv.slice(2)[0];
const sourcePath = process.argv.slice(3)[0];
const targetPath = process.argv.slice(4)[0];

const ellieOrganizer = require("./lib/ellie-organizer.js");

const helper = require("./lib/sort-helper.js");
const helperMethodList = ["screenshot", "daily"];
const customMethodList = ["ellie"];
main();

// 🏃🏻‍♀️run ex - node app.js ellie /Users/yumi/Downloads/life/photo/test/ _
// 🏃🏻‍♀️run ex - node app.js screenshot /Users/yumi/Desktop/ /Users/yumi/Desktop/Screenshot/
// 🏃🏻‍♀️run ex - node app.js daily /Users/yumi/Desktop/ /Users/yumi/Desktop/DailyScreenshot/
function main() {
  console.log("🥁🥁🥁🥁🥁");
  console.log(`Processing in ${sourcePath}`);
  if (!customMethodList.includes(method) & !helperMethodList.includes(method)) {
    console.log(`Unrecognized method! - ${method}`);
    return;
  }

  if (method == "ellie") {
    ellieOrganizer.organizer(sourcePath);
  } else if (helperMethodList.includes(method)) {
    helper.findOrCreateDirectory(targetPath);
    helper.organizer(sourcePath, targetPath, method)
  }
}
