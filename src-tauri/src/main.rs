// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use nemassler::{audio_file::AudioFile, traits::Converter};

// get current username of user's os.
#[tauri::command]
fn whoami() -> String {
    let username = whoami::username();
    format!("{}", username)
}

// ncm2mp3
#[tauri::command]
fn ncm2mp3(ncm_dir: &str, out_dir: &str) -> Vec<String> {
    AudioFile::ncm2mp3(ncm_dir, out_dir)
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![whoami, ncm2mp3])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
