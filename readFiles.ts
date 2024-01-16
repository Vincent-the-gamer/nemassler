import fs from "fs"
import path from "path"
import { ensureDirectoryExists } from "./fileUtils"

export default async function readFiles(mp3Dir: string, ncmDir: string, songCoverOutDir: string) {
    // ensure directories exist
    await ensureDirectoryExists(mp3Dir)
    await ensureDirectoryExists(ncmDir)
    await ensureDirectoryExists(songCoverOutDir)

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