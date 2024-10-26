use std::{io::Cursor, path::Path};

use lofty::{
    config::{ParseOptions, WriteOptions},
    file::AudioFile,
    flac::FlacFile,
    id3::v2::Id3v2Tag,
    mpeg::MpegFile,
    picture::Picture,
    tag::TagExt,
};

pub struct LoftyMetaData {
    pub tag: Id3v2Tag,
}

impl LoftyMetaData {
    pub fn from(audio: &[u8], picture: &[u8]) -> Self {
        let mut reader = Cursor::new(audio);
        let mp3_file = MpegFile::read_from(&mut reader, ParseOptions::default());
        if let Ok(mp3_file) = mp3_file {
            let mut tag = mp3_file.id3v2().unwrap().clone();
            let mut picture_bytes = Cursor::new(picture);
            let _ = tag.insert_picture(Picture::from_reader(&mut picture_bytes).unwrap());
            return Self { tag };
        }
        let flac_file = FlacFile::read_from(&mut reader, ParseOptions::default());
        if let Ok(flac_file) = flac_file {
            let mut tag = flac_file.id3v2().unwrap().clone();
            let mut picture_bytes = Cursor::new(picture);
            let _ = tag.insert_picture(Picture::from_reader(&mut picture_bytes).unwrap());
            return Self { tag };
        }
        panic!("none of the supported formats found: (mp3, flac)")
    }
}

impl LoftyMetaData {
    pub fn inject_to_path<P: AsRef<Path>>(&self, path: P) {
        self.tag
            .save_to_path(path, WriteOptions::default())
            .unwrap();
    }
}
