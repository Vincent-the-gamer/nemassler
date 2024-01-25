/**
 * netease music .ncm audio to mp3
 */

const { ncm2mp3 } = require("@vincent-the-gamer/utils/server")

// @ts-ignore
const fs = require("fs")
// @ts-ignore
const path = require("path")

// 前置文件检查
async function preCheck(ncmDir){
    return new Promise((resolve, reject) => {
        // 删除 macOS .DS_Store 文件
        if(fs.existsSync(ncmDir + "/.DS_Store")){
            fs.unlink(ncmDir + "/.DS_Store", (err) => {
                if (err) reject(err);
                console.log('deleted .DS_Store');
            });
        }

        if(fs.existsSync(ncmDir)){
            fs.readdir(path.resolve(__dirname, ncmDir), (err, files) => {
                files.forEach(file => {
                    const filePath = path.resolve(__dirname, ncmDir) + "/" + file

                    // 删除ncm文件夹中的其它后缀文件
                    if( !filePath.trim().endsWith(".ncm") ) {
                        fs.unlink(filePath, err => {
                            if (err) {
                                reject(`Error deleting file: ${filePath}, ${err}`)
                            }
                        })
                    }
                })
            })
        }

        resolve("")
    })
}

module.exports.ncm2mp3CustomDirectory = ncm2mp3