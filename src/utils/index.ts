import { open } from '@tauri-apps/api/shell';

/**
 * In Tauri app, open link with user's default browser.
 */
export function openPage(url: string){
    open(url)
}