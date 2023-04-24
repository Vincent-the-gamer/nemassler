const fs = require('fs');
const path = require('path');
 
module.exports.readFiles = async () => {
    return new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, "./public/mp3"), (err, files) => { 
            if (err) 
                reject(err); 
            else { 
                // 排除.DS_Store
               resolve(files.filter(item => item !== ".DS_Store"))
            } 
        }) 
    })
}