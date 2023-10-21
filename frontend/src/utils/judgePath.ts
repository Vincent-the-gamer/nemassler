import useCurrentPlatform from "@/hooks/useCurrentPlatform"

export default function judgePath(path: string): boolean{
    const winDirRegex: RegExp = /^[A-Z]:\\(?:[^<>:"/\\|?*]+\\)*[^<>:"/\\|?*]+$/
    const macOrLinuxRegex: RegExp = /^\/(?:[^/]+\/)*[^/]+$/

    const currentPlatform = useCurrentPlatform();
    switch (currentPlatform) {
        case "win32":
        case "win64":
            return winDirRegex.test(path)
        case "mac":
        case "linux":
            return macOrLinuxRegex.test(path)
        default:
            return false
    }
}