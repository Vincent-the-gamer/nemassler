// @ts-ignore
const fileUtils = require("./fileUtils.ts")
// @ts-ignore
const fs = require("fs")
// @ts-ignore
const path = require("path")

module.exports.readFiles = async (mp3Dir, ncmDir, songCoverOutDir) => {
    // ensure directories exist
    await fileUtils.ensureDirectoryExists(mp3Dir)
    await fileUtils.ensureDirectoryExists(ncmDir)
    await fileUtils.ensureDirectoryExists(songCoverOutDir)

    return new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, mp3Dir), (err, files) => { 
            if (err) 
                reject(err); 
            else { 
                // only read specific files
                resolve(files.filter(item => {
                    return item.endsWith(".ncm") ||
                           item.endsWith(".mp3") ||
                           item.endsWith(".png") ||
                           item.endsWith(".jpg") ||
                           item.endsWith(".jpeg") 
                }))

            } 
        }) 
    })
}
