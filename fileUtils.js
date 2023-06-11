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

