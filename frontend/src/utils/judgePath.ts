import { getCurrentPlatform } from "@vincent-the-gamer/utils";

export default function judgePath(path: string): boolean{
    const winDirRegex: RegExp = /^[A-Z]:\\(?:[^<>:"/\\|?*]+\\)*[^<>:"/\\|?*]+$/
    const macOrLinuxRegex: RegExp = /^\/(?:[^/]+\/)*[^/]+$/

    const currentPlatform = getCurrentPlatform();
    switch (currentPlatform) {
        case "windows":
            return winDirRegex.test(path)
        case "macOS":
        case "linux":
            return macOrLinuxRegex.test(path)
        default:
            return false
    }
}