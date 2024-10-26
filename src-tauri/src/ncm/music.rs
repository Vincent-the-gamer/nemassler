use crate::LoftyMetaData;

/// Stores music data extracted from an NCM file.
pub struct NcmMusic {
    pub metadata: LoftyMetaData,
    pub audio_data: Vec<u8>,
    pub music_type: String,
}

impl NcmMusic {
    pub fn new(metadata: LoftyMetaData, music_type: String, audio_data: Vec<u8>) -> Self {
        Self {
            metadata,
            audio_data,
            music_type,
        }
    }
}
