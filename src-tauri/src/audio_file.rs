use crate::{
    ncm2mp3::process_file, 
    traits::{Converter, Ensure, Filter}
};
use std::{fs, path::Path};

pub struct AudioFile<'a> {
    pub path: &'a str,
    pub file_name: &'a str,
    pub suffix: &'a str,
}

impl<'a> AudioFile<'a> {
    pub fn new(full_path: &'a str) -> Self {
        let full_path = Path::new(full_path);
        let path = full_path
            .parent()
            .expect("Error when parsing path!")
            .to_str()
            .unwrap();
        let file_name = full_path
            .file_name()
            .expect("Error when parsing filename!")
            .to_str()
            .unwrap();
        let suffix = full_path
            .extension()
            .expect("Error when parsing suffix!")
            .to_str()
            .unwrap();
        AudioFile {
            path,
            file_name,
            suffix,
        }
    }
}

impl<'a> Ensure for AudioFile<'a> {
    fn ensure_directory_exists(dir: &str) -> () {
        let path = Path::new(dir);
        if !path.exists() {
            match fs::create_dir(&path) {
                Ok(_) => println!("Created directory: {}", dir),
                Err(e) => println!("Error creating directory: {}", e),
            }
        }
    }
}

impl<'a> Filter for AudioFile<'a> {
    fn filter_by_suffix(dir: &str, suffix: &str) {
        // walk through the directory
        if let Ok(entries) = fs::read_dir(dir) {
            for entry in entries {
                if let Ok(entry) = entry {
                    if let Some(entry_suffix) = entry.path().extension().and_then(|s| s.to_str()) {
                        if entry_suffix != suffix {
                            if let Err(e) = fs::remove_file(entry.path()) {
                                eprintln!("Error removing file: {}", e);
                            }
                        }
                    }
                }
            }
        } else {
            eprintln!("Error reading directory {}", dir);
        }
    }
}

impl<'a> Converter for AudioFile<'a> {
    fn ncm2mp3(ncm_dir: &str, out_dir: &str) -> Vec<String> {
        let mut results: Vec<String> = vec![];
        Self::ensure_directory_exists(ncm_dir);
        Self::ensure_directory_exists(out_dir);
        Self::filter_by_suffix(ncm_dir, "ncm");
        if let Ok(entries) = fs::read_dir(ncm_dir) {
            for entry in entries {
                if let Ok(entry) = entry {
                    let path_buf = entry.path();
                    let result = process_file(path_buf.to_str().unwrap(), out_dir).unwrap();
                    results.push(result);
                }
            }
        } else {
            eprintln!("Error converting ncm.");
        }
        
        results
    }
}