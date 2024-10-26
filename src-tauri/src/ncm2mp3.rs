use std::path::Path;

use crate::NcmDumper;

pub fn process_file(ncm_dir: &str, out_dir: &str) -> std::io::Result<String> {
    let mut ncm_dir = ncm_dir;
    if ncm_dir.ends_with("/") {
        ncm_dir = ncm_dir.strip_suffix("/").unwrap();
    }
    let out_dir_clone = String::from(out_dir);
    let ncm_path = Path::new(ncm_dir);
    let out_path = Path::new(out_dir);
    if let Ok(_) = NcmDumper::dump(ncm_path, out_path) {
        Ok(format!("Output file: {}", out_dir_clone))
    } else {
        Ok(String::from("Convert failed!"))
    }
}
