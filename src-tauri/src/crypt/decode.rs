use aes::Aes128;
use base64::engine::general_purpose::STANDARD;
use base64::Engine;
use cipher::block_padding::Pkcs7;
use cipher::BlockDecryptMut;
use cipher::KeyInit;

use crate::error::CryptError;

pub fn aes128_decrypt(encrypted: Vec<u8>, key: &[u8; 16]) -> Result<Vec<u8>, CryptError> {
    let result = Aes128::new(key.into())
        .decrypt_padded_vec_mut::<Pkcs7>(&encrypted)
        .map_err(|_| CryptError::AesDecryptError)?;
    Ok(result)
}

pub fn base64_decode(encrypted: Vec<u8>) -> Result<Vec<u8>, CryptError> {
    let result = STANDARD
        .decode(encrypted)
        .map_err(|_| CryptError::Base64DecodeError)?;
    Ok(result)
}
