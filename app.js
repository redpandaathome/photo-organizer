fs = require('fs');
const method = process.argv.slice(2)[0];
const folder = process.argv.slice(3)[0];
const ellieOrganizer = require("./lib/ellie-organizer.js");
const caputreOrganizer = require("./lib/capture-organizer.js")
main()

// run ex - node app.js ellie test
// run ex - node app.js screenshot Screenshot

// FULL_PATH ex - export FULL_PATH="/Users/yumi/Downloads/life/photo/"
function main(){
   console.log("🥁🥁🥁🥁🥁")
   const fullPath = process.env.FULL_PATH + folder + "/";
   const deskTopPath = '/Users/yumi/Desktop/';
   console.log(`Processing in ${fullPath}`)
   if (method == 'ellie'){
      ellieOrganizer.organizer(fullPath)
   } else if ( method == 'screenshot'){
      caputreOrganizer.organizer(deskTopPath, folder)
   }
}