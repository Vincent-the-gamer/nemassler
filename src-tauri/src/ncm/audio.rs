use crate::NcmRc4;

/// Decrypt audio in encrypted byte stream to decrypted byte stream that can be write into mp3
/// use rc4 to decrypt the audio
/// See [`NcmDecoder::decode`]
pub struct Audio {
    ncm_rc4: NcmRc4,
    encrypted: Vec<u8>,
}

impl Audio {
    pub fn new(ncm_rc4: NcmRc4, encrypted: Vec<u8>) -> Self {
        Self { ncm_rc4, encrypted }
    }

    pub fn get_decrypted_audio(mut self) -> Vec<u8> {
        self.ncm_rc4.decrypt(&mut self.encrypted);
        self.encrypted
    }
}
