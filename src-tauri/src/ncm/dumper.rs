use std::{
    fs::File,
    io::{Cursor, Write},
    path::{Path, PathBuf},
};

use crate::{NcmDecoder, NcmMusic};

use rayon::prelude::*;

/// General handler to dump NCM files to mp3
///
/// # Fields
///
/// `music_list`: List of paths to NCM files to be dumped
///
/// `output_directory`: Directory where the dumped files will be saved
pub struct NcmDumper {
    music_list: Vec<PathBuf>,
    output_directory: PathBuf,
}

impl NcmDumper {
    pub fn new(music_list: Vec<PathBuf>, output_directory: PathBuf) -> Self {
        Self {
            music_list,
            output_directory,
        }
    }

    pub fn dump_all(self) -> anyhow::Result<()> {
        self.music_list.into_par_iter().for_each(|path_buf| {
            Self::dump(&path_buf, &self.output_directory).unwrap();
        });
        Ok(())
    }

    pub fn dump(path_buf: &Path, output_directory: &Path) -> anyhow::Result<()> {
        let stream = std::fs::read(path_buf)?;
        let mut decoder = NcmDecoder::from_reader(Cursor::new(stream));
        let NcmMusic {
            metadata,
            music_type,
            audio_data,
        } = decoder.decode()?;
        let file_name = path_buf.file_name().unwrap();
        let path = output_directory.join(file_name).with_extension(music_type);
        let mut file = File::options()
            .write(true)
            .create(true)
            .truncate(true)
            .open(&path)?;
        file.write_all(&audio_data)?;
        metadata.inject_to_path(path);
        Ok(())
    }
}
