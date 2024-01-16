/**
 * netease music .ncm audio to mp3
 */
// @ts-ignore
const fs = require("fs")
const aes = require("aes-js")
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

module.exports.ncm2mp3CustomDirectory = async (ncmDir, mp3OutDir, songCoverOutDir) => {
    preCheck(ncmDir).then(success => {
        fs.readdir(path.resolve(__dirname, ncmDir), function (err, files) {
            files.forEach(v => {
                const filePath = path.resolve(__dirname, ncmDir) + "/" + v

                // 只对ncm后缀的文件进行操作
                if( filePath.trim().endsWith(".ncm") ) {
                    const file = fs.readFileSync(filePath);
                    let globalOffset = 10;
        
                    const keyLength = file.readUInt32LE(10);
                    globalOffset += 4;
        
                    const keyData = Buffer.alloc(keyLength);
        
                    file.copy(keyData, 0, globalOffset, globalOffset + keyLength);
                    globalOffset += keyLength;
        
                    for (let i = 0; i < keyLength; i++) {
                        keyData[i] ^= 0x64;
                    }
        
                    const coreKey = new Uint8Array([0x68, 0x7A, 0x48, 0x52, 0x41, 0x6D, 0x73, 0x6F, 0x35, 0x6B, 0x49, 0x6E, 0x62, 0x61, 0x78, 0x57]);
        
                    const aesEcb = new aes.ModeOfOperation.ecb(coreKey);
        
                    const decodedKeyData = aes.padding.pkcs7.strip(aesEcb.decrypt(keyData));
        
                    const trimKeyData = decodedKeyData.slice(17);
        
        
                    const metaLength = file.readUInt32LE(globalOffset);
                    globalOffset += 4;
        
                    const metaData = Buffer.alloc(metaLength);
                    file.copy(metaData, 0, globalOffset, globalOffset + metaLength);
                    globalOffset += metaLength;
                    for (let i = 0; i < metaLength; i++) {
                        metaData[i] ^= 0x63;
                    }
        
                    const base64decode = Buffer.from(Buffer.from(metaData.slice(22)).toString('ascii'), 'base64');
        
                    const metaKey = new Uint8Array([0x23, 0x31, 0x34, 0x6C, 0x6A, 0x6B, 0x5F, 0x21, 0x5C, 0x5D, 0x26, 0x30, 0x55, 0x3C, 0x27, 0x28]);
                    const aseMeta = new aes.ModeOfOperation.ecb(metaKey);
                    const meatArray = aes.padding.pkcs7.strip(aseMeta.decrypt(base64decode));
        
                    const metaJson = Buffer.from(meatArray).toString('utf8');
        
                    const metaObject = JSON.parse(metaJson.substr(6));
        
                    // 读取 crc32 校验
                    file.readUInt32LE(globalOffset);
                    globalOffset += 4;
                    globalOffset += 5;
                    // 读取图像长度
                    const imageLength = file.readUInt32LE(globalOffset);
                    globalOffset += 4;
        
                    const imageBuffer = Buffer.alloc(imageLength);
                    file.copy(imageBuffer, 0, globalOffset, globalOffset + imageLength);
                    globalOffset += imageLength;
                    // 写入图像文件
                    fs.writeFileSync(path.resolve(__dirname, songCoverOutDir) + "/" + v.replace(/.ncm/, '') + '.jpg', imageBuffer);
        
                    function buildKeyBox(key) {
                        const keyLength = key.length;
                        const box = Buffer.alloc(256);
        
                        for (let i = 0; i < 256; i++) {
                            box[i] = i;
                        }
        
                        let swap = 0;
                        let c = 0;
                        let lastByte = 0;
                        let keyOffset = 0;
        
                        for (let i = 0; i < 256; ++i) {
                            swap = box[i];
                            c = ((swap + lastByte + key[keyOffset++]) & 0xff);
                            if (keyOffset >= keyLength) {
                                keyOffset = 0;
                            }
                            box[i] = box[c];
                            box[c] = swap;
                            lastByte = c;
                        }
        
                        return box;
                    }
        
                    const box = buildKeyBox(trimKeyData);
        
                    let n = 0x8000;
                    let fmusic = [];
                    while (n > 1) {
                        const buffer = Buffer.alloc(n);
                        n = file.copy(buffer, 0, globalOffset, globalOffset + n);
                        globalOffset += n;
        
                        for (let i = 0; i < n; i++) {
                            let j = (i + 1) & 0xff;
                            buffer[i] ^= box[(box[j] + box[(box[j] + j) & 0xff]) & 0xff];
                        }
                        // @ts-ignore
                        fmusic.push(buffer);
                    }
                    fs.writeFileSync(path.resolve(__dirname, mp3OutDir) + "/" + v.replace(/.ncm/, '.mp3'), Buffer.concat(fmusic));
                }
            })
        })
    }, err => {
        console.log(err)
    })
}
