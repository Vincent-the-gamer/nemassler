const fs = require('fs');
const path = require('path');
const NodeID3 = require("node-id3")
 
module.exports.readFiles = async (mp3Dir) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, mp3Dir), (err, files) => { 
            if (err) 
                reject(err); 
            else { 
                // 排除.DS_Store
               resolve(files.filter(item => item !== ".DS_Store"))
            } 
        }) 
    })
}

// 读取单个文件
module.exports.readSingleFile = async (mp3Dir, mp3FileName) => {
    return new Promise((resolve, reject) => {
        // path是音频文件的路径
        let path = `${mp3Dir}/${mp3FileName}`
        NodeID3.read(path, (err, tags) => {
            if (err) {
                reject(err);
            }
            resolve(NodeID3.create(tags));
        });

    })
}
