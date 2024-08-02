pub trait Ensure {
    fn ensure_directory_exists(dir: &str) -> ();
}

pub trait Filter {
    // filter out files in directory that not match your given suffix.
    fn filter_by_suffix(dir: &str, suffix: &str) -> ();
}

pub trait Converter: Filter + Ensure {
    fn ncm2mp3(ncm_dir: &str, out_dir: &str) -> Vec<String>;
}