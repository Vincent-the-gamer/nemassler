use std::{fs::File, io::Write};

use ncmdump::Ncmdump;

pub fn process_file(ncm_dir: &str, out_dir: &str, file_name: &str) -> std::io::Result<String> {
    let no_suffix_file_name = file_name.strip_suffix(".ncm").unwrap();
    let mp3_file_name = format!("{}.mp3", no_suffix_file_name);
    let mut ncm_dir = ncm_dir;
    let mut out_dir = out_dir;
    if ncm_dir.ends_with("/") {
        ncm_dir = ncm_dir.strip_suffix("/").unwrap();
    }
    if out_dir.ends_with("/") {
        out_dir = out_dir.strip_suffix("/").unwrap();
    }
    let ncm_file_path = format!("{}/{}", ncm_dir, file_name);
    let out_file_path = format!("{}/{}", out_dir, mp3_file_name);
    let out_file_path_clone = String::from(&out_file_path);
    let ncm_file = File::open(ncm_file_path.as_str())?;
    let mut ncm = Ncmdump::from_reader(ncm_file).expect("Can't create dump");
    let music = ncm.get_data().expect("Can't get data");
    
    let mut target = File::options()
         .create(true)
         .write(true)
         .open(out_file_path.as_str())?;

    if let Ok(_) = target.write_all(&music){
        Ok(format!("Output file: {}", out_file_path_clone))
    } else {
        Ok(String::from("Convert failed!"))
    }
}
