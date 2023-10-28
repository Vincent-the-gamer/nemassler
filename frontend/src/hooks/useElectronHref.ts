// <a href> open a external browser window while in electron environment.
function electronHref(url: string, event: any) {
    if (window.require !== undefined) {
        const { shell } = require("electron");
        event.preventDefault();
        shell.openExternal(url);
    } else {
        window.open(url);
    }
}

export default function useElectronHref(url: string){
    return (event: any) => electronHref(url, event)
}