fs = require('fs');
const method = process.argv.slice(2)[0];
const sourcePath = process.argv.slice(3)[0];
const targetPath = process.argv.slice(4)[0];

const ellieOrganizer = require("./lib/ellie-organizer.js");
const caputreOrganizer = require("./lib/capture-organizer.js")
const dailyOrganizer = require("./lib/daily-organizer.js");
main()

// run ex - node app.js ellie /Users/yumi/Downloads/life/photo/test/ _
// run ex - node app.js screenshot /Users/yumi/Desktop/ /Users/yumi/Desktop/Screenshot/
// run ex - node app.js daily Aug

// FULL_PATH ex - export FULL_PATH="/Users/yumi/Downloads/life/photo/"
function main(){
   console.log("🥁🥁🥁🥁🥁")
   console.log(`Processing in ${sourcePath}`)
   if (method == 'ellie'){
      ellieOrganizer.organizer(sourcePath)
   } else if ( method == 'screenshot'){
      caputreOrganizer.organizer(sourcePath, targetPath)
   } else if ( method == 'daily'){
      dailyOrganizer.organizer(fullPath)
   }
}