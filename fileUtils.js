const fs = require("fs")

module.exports.ensureDirectoryExists = async (directory) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(directory)) {
            fs.mkdir(directory, {recursive:true}, (err) => {
                if (err) reject(err);
            });  
        }
        resolve("")
    })
}

module.exports.createSymbolicLink = async (source, target) => {
    return new Promise((resolve, reject) => {
        if(!fs.existsSync(source)) reject("source doesn\'t exist!")
        else if(fs.existsSync(target)) 
        {
            // remove symlink
            fs.unlinkSync(target, err => {
                console.log(err)
            })
            // recreate symlink
            fs.symlink(source,
                target, 'file', (err) => {
                if (err)
                    reject(err);
                else {
                    console.log(`Symlink exists and it is replaced`);
                }
            })
        }
        else {
            fs.symlink(source,
                target, 'file', (err) => {
                if (err)
                    reject(err);
                else {
                    console.log(`Symlink created!`);
                }
            })
        }
        resolve("")
    })
    
}