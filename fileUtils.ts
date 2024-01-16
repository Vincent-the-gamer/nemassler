import fs from "fs"
import path from "path"

export async function ensureDirectoryExists(directory: string) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(directory)) {
            fs.mkdir(directory, {recursive:true}, (err) => {
                if (err) reject(err);
            });  
        }
        resolve("")
    })
}

/**
 * 删除mp3文件夹中非mp3文件
 */
export async function filterMp3(directory: string): Promise<string> {
    if (!fs.existsSync(directory)) {
       return Promise.reject("未找到路径！directory not found!")
    }
    fs.readdir(path.resolve(__dirname, directory), (err, files) => { 
        if (err) 
            return Promise.reject(err); 
        else { 
            files.forEach(item => {
                if(!item.endsWith(".mp3")) {
                    fs.rm(path.resolve(__dirname, directory) + `/${item}`, (err) => {
                        if(err) {
                            Promise.reject("过滤mp3错误！Error while delete non-mp3 file！")
                            return
                        }
                    })
                }
            })
        }
    }) 
    return Promise.resolve("成功过滤非mp3文件! Successfully filtered files!")
}