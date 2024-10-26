import { open } from '@tauri-apps/plugin-shell';

/**
 * In Tauri app, open link with user's default browser.
 */
export function openPage(url: string){
    open(url)
}