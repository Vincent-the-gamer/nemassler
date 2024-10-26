use std::io::{Read, Seek};

use crate::NcmDecodeError;
use crate::{crypt, LoftyMetaData};

use super::audio::Audio;
use super::model::NcmInfo;
use super::NcmMusic;
use crypt::NcmRc4;

const HEADER_KEY: [u8; 16] = [
    0x68, 0x7A, 0x48, 0x52, 0x41, 0x6D, 0x73, 0x6F, 0x35, 0x6B, 0x49, 0x6E, 0x62, 0x61, 0x78, 0x57,
];

const INFO_KEY: [u8; 16] = [
    0x23, 0x31, 0x34, 0x6C, 0x6A, 0x6B, 0x5F, 0x21, 0x5C, 0x5D, 0x26, 0x30, 0x55, 0x3C, 0x27, 0x28,
];

const SALT_VALUE: &str = "neteasecloudmusic";

/// Handle the decoding process of a NCM file
///
/// # Example
/// ``` rust
/// use std::path::PathBuf;
///
/// let file_path = PathBuf::from("path/to/file.ncm");
/// let mut decoder = NcmDecoder::new(&file_path);
/// let music: NcmMusic = decoder.decode()?;
/// ```
pub struct NcmDecoder<T: Read + Seek> {
    reader: T,
}

impl<T: Read + Seek> NcmDecoder<T> {
    pub fn from_reader(reader: T) -> Self {
        NcmDecoder { reader }
    }

    pub fn decode(&mut self) -> Result<NcmMusic, NcmDecodeError> {
        self.parse_header()?;
        let ncm_rc4 = self.parse_rc4_handler()?;
        let ncm_info = self.parse_music_info()?;
        let music_type = ncm_info.format.clone();
        let _ = self.take_next_bytes(9)?;
        let image = self.parse_image()?;
        let audio = self.parse_audio(ncm_rc4)?;
        let metadata = LoftyMetaData::from(&audio, &image);

        Ok(NcmMusic::new(metadata, music_type, audio))
    }

    pub fn parse_header(&mut self) -> Result<(), NcmDecodeError> {
        let mut header_buffer = [0; 10];
        let header_size = self
            .reader
            .read(&mut header_buffer)
            .map_err(|_| NcmDecodeError::InvalidHeader)
            .unwrap();
        if header_size != 10 {
            return Err(NcmDecodeError::InvalidHeader);
        }
        assert_eq!(self.reader.stream_position().unwrap(), 10);
        Ok(())
    }

    pub fn parse_rc4_handler(&mut self) -> Result<NcmRc4, NcmDecodeError> {
        let encrypted_key = self.get_encrypted_rc4_key()?;
        let rc4_key = self.decrypt_rc4_key(encrypted_key)?;

        Ok(NcmRc4::new(&rc4_key))
    }

    pub fn parse_music_info(&mut self) -> Result<NcmInfo, NcmDecodeError> {
        let info_length = self.parse_length()?;
        let ncm_info = self.get_json_info(info_length)?;

        Ok(ncm_info)
    }

    pub fn parse_image(&mut self) -> Result<Vec<u8>, NcmDecodeError> {
        let image_length = self.parse_length()?;
        let image_bytes = self.take_next_bytes(image_length)?;

        Ok(image_bytes)
    }

    pub fn parse_audio(&mut self, ncm_rc4: NcmRc4) -> Result<Vec<u8>, NcmDecodeError> {
        let mut encrypted_audio = Vec::new();
        self.reader
            .read_to_end(&mut encrypted_audio)
            .map_err(|_| NcmDecodeError::ReadSizeError)?;
        let audio = Audio::new(ncm_rc4, encrypted_audio);

        Ok(audio.get_decrypted_audio())
    }
}

/// private utils to decode
impl<T: Read + Seek> NcmDecoder<T> {
    fn parse_length(&mut self) -> Result<u64, NcmDecodeError> {
        let mut byte_length = [0; 4];

        let bytes_size = self
            .reader
            .read(&mut byte_length)
            .map_err(|_| NcmDecodeError::ReadSizeError)?;
        if bytes_size != 4 {
            return Err(NcmDecodeError::ReadSizeError);
        }

        let length = u32::from_ne_bytes(byte_length) as u64;
        Ok(length)
    }

    fn take_next_bytes(&mut self, length: u64) -> Result<Vec<u8>, NcmDecodeError> {
        let mut buffer = Vec::with_capacity(length as usize);
        let reader_ref = self.reader.by_ref();

        let bytes_size = reader_ref
            .take(length)
            .read_to_end(&mut buffer)
            .map_err(|_| NcmDecodeError::ReadSizeError)?;

        if bytes_size != length as usize {
            return Err(NcmDecodeError::ReadSizeError);
        }
        Ok(buffer)
    }

    fn get_encrypted_rc4_key(&mut self) -> Result<Vec<u8>, NcmDecodeError> {
        let key_length = self.parse_length()?;
        let key = self.take_next_bytes(key_length)?;

        Ok(key)
    }

    fn decrypt_rc4_key(&self, mut encrypted_key: Vec<u8>) -> Result<Vec<u8>, NcmDecodeError> {
        encrypted_key.iter_mut().for_each(|byte| *byte ^= 0x64);

        let aes_decrypted_key = crypt::aes128_decrypt(encrypted_key, &HEADER_KEY)?;

        let salt = String::from_utf8(aes_decrypted_key[..17].to_vec())
            .map_err(|_| NcmDecodeError::StringConvertError)?;

        if salt != SALT_VALUE {
            return Err(NcmDecodeError::SaltError);
        }

        Ok(aes_decrypted_key[17..].to_vec())
    }

    fn get_json_info(&mut self, length: u64) -> Result<NcmInfo, NcmDecodeError> {
        let mut info_data = self.take_next_bytes(length)?;

        info_data.iter_mut().for_each(|byte| *byte ^= 0x63);
        let base64_decoded_info = crypt::base64_decode(info_data[22..].to_vec())?;
        let aes_decoded_info = crypt::aes128_decrypt(base64_decoded_info, &INFO_KEY)?;

        let json_string = String::from_utf8(aes_decoded_info[6..].to_vec())
            .map_err(|_| NcmDecodeError::StringConvertError)?;
        let ncm_info = NcmInfo::from(json_string);
        Ok(ncm_info)
    }
}
