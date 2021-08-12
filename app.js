fs = require('fs');
const method = process.argv.slice(2)[0];
const folder = process.argv.slice(3)[0];
const ellieOrganizer = require("./lib/organizer-for-ellie.js");
main()

// run ex - node app.js ellie test
// run ex - node app.js screenshot to-be-sorted

// FULL_PATH ex - export FULL_PATH="/Users/yumi/Downloads/life/photo/"
function main(){
   console.log("🥁🥁🥁🥁🥁")
   const fullPath = process.env.FULL_PATH + folder + "/";
   console.log(`Processing in ${fullPath}`)
   if (method == 'ellie'){
      ellieOrganizer.organizer(fullPath)
   } else if ( method == 'screenshot'){
      
   }
}