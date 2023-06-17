// get current OS
export default function useCurrentPlatform(): string {
    const agent: string = navigator.userAgent.toLowerCase();
    const isMac: boolean = /macintosh|mac os x/i.test(navigator.userAgent);
    if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
        return "win32"
    }
    if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
        return "win64"
    }
    if (isMac) {
        return "mac"
    }
    else {
        return "linux"
    }
}