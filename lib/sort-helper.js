exports.sort = sort
function sort(fileName, sourcePath, targetPath){
   console.log("🦜 Sorting... fileName:", fileName,", sourcePath:", sourcePath,", targetPath:", targetPath)
   fs.rename(sourcePath+fileName, targetPath+fileName, (err)=>{
      if (err == null){
         console.log(`Successfully removed to ${targetPath} - fileName: ${fileName}`)
         return
      }
      if (err.code=='ENOENT') {
         console.log(`err: ${fileName} to move to ${targetPath} does not exist!`)
         return
      }
      throw err
   })
}

exports.makeDirectories = makeDirectories
function makeDirectories(needed, sourcePath){
   needed.forEach(el=> {
      const tempPath = sourcePath+el
      if (!fs.existsSync(tempPath)){
         fs.mkdirSync(tempPath);
     }
   })
}
