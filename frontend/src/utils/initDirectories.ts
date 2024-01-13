import useCurrentPlatform from "@/hooks/useCurrentPlatform"

// init directorys
export function getNcmDir(){
    const platform = useCurrentPlatform()
    if(localStorage.getItem("ncmDir")) return localStorage.getItem("ncmDir")
    else{
        if(platform === "win32" || platform === "win64"){
            return `C:\\Users\\Public\\ncm`
        } else if(platform === "mac") {
            return `/Users/Shared/ncm`
        }
        else return `~/Public/ncm` 
    }
}

export function getMp3OutDir(){
    const platform = useCurrentPlatform()
    if(localStorage.getItem("mp3OutDir")) return localStorage.getItem("mp3OutDir")
    else{
        if(platform === "win32" || platform === "win64"){
            return `C:\\Users\\Public\\mp3`
        } else if(platform === "mac") {
            return `/Users/Shared/mp3` 
        }
        else return `~/Public/mp3` 
    } 
}

export function getSongCoverOutDir(){
    const platform = useCurrentPlatform()
    if(localStorage.getItem("songCoverOutDir")) return localStorage.getItem("songCoverOutDir")
    else{
        if(platform === "win32" || platform === "win64"){
            return `C:\\Users\\Public\\songcover`
        } else if(platform === "mac") {
            return `/Users/Shared/songcover` 
        }
        else return `~/Public/songcover` 
    }
}