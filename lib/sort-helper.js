exports.sort = sort
function sort(fileName, fullPath, newPath){
   console.log("🦜 Sorting... fileName:", fileName,", fullPath:", fullPath,", newPath:", newPath)
   fs.rename(fullPath+fileName, newPath+"/"+fileName, (err)=>{
      if (err == null){
         console.log(`Successfully removed to ${newPath} - ${fileName}`)
         return
      }
      if (err.code=='ENOENT') {
         console.log(`err: ${fileName} to move to ${newPath} does not exist!`)
         return
      }
      throw err
   })
}

exports.makeDirectories = makeDirectories
function makeDirectories(needed, fullPath){
   needed.forEach(el=> {
      const tempPath = fullPath+el
      if (!fs.existsSync(tempPath)){
         fs.mkdirSync(tempPath);
     }
   })
}
