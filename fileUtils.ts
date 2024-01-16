import fs from "fs"

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

