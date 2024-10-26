use thiserror::Error;

#[derive(Error, Debug)]
pub enum NcmDecodeError {
    #[error("Read size do not match required size")]
    ReadSizeError,
    #[error("Failed to parse Length")]
    LengthError,
    #[error("Failed to parse magic header")]
    InvalidHeader,
    #[error("Failed to parse key")]
    InvalidKey,
    #[error("Failed to decrypt")]
    CryptError,
    #[error("Failed to parse salt <- neteasecloudmusic")]
    SaltError,
    #[error("Failed to convert Vec<u8> to String")]
    StringConvertError,
    #[error("Failed to parse json")]
    JsonParseError,
    #[error("Failed to parse ncm_id")]
    InvalidId,
}

impl From<CryptError> for NcmDecodeError {
    fn from(_: CryptError) -> Self {
        NcmDecodeError::CryptError
    }
}

#[derive(Error, Debug)]
pub enum CryptError {
    #[error("Failed to decrypt Aes128")]
    AesDecryptError,
    #[error("Failed to decrypt Base64")]
    Base64DecodeError,
}
