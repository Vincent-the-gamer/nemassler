const fs = require('fs');
const path = require('path');
const fileUtils = require("./fileUtils")

module.exports.readFiles = async (mp3Dir, ncmDir, songCoverOutDir) => {
    // ensure directories exist
    await fileUtils.ensureDirectoryExists(mp3Dir)
    await fileUtils.ensureDirectoryExists(ncmDir)
    await fileUtils.ensureDirectoryExists(songCoverOutDir)

    // create symbolic link of mp3 folder
    await fileUtils.createSymbolicLink(mp3Dir, "public/mp3")

    return new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, mp3Dir), (err, files) => { 
            if (err) 
                reject(err); 
            else { 
                // exclude .DS_Store
                fs.existsSync(path.resolve(__dirname, mp3Dir) + "/.DS_Store") ?
                resolve(files.filter(item => item !== ".DS_Store")) :
                resolve(files)
            } 
        }) 
    })
}

