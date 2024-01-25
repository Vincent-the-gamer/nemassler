import { getCurrentPlatform } from "@vincent-the-gamer/utils"
import os from "os"

// init directorys
export function getNcmDir(){
    const platform = getCurrentPlatform()
    if(localStorage.getItem("ncmDir")) return localStorage.getItem("ncmDir")
    else{
        if(platform === "windows"){
            return `C:\\Users\\Public\\ncm`
        } else if(platform === "macOS") {
            return `/Users/Shared/ncm`
        }
        else return `/home/${os.userInfo().username}/Public/ncm` 
    }
}

export function getMp3OutDir(){
    const platform = getCurrentPlatform()
    if(localStorage.getItem("mp3OutDir")) return localStorage.getItem("mp3OutDir")
    else{
        if(platform === "windows" ){
            return `C:\\Users\\Public\\mp3`
        } else if(platform === "macOS") {
            return `/Users/Shared/mp3` 
        }
        else return `/home/${os.userInfo().username}/Public/mp3` 
    } 
}

export function getSongCoverOutDir(){
    const platform = getCurrentPlatform()
    if(localStorage.getItem("songCoverOutDir")) return localStorage.getItem("songCoverOutDir")
    else{
        if(platform === "windows"){
            return `C:\\Users\\Public\\songcover`
        } else if(platform === "macOS") {
            return `/Users/Shared/songcover` 
        }
        else return `/home/${os.userInfo().username}/Public/songcover` 
    }
}