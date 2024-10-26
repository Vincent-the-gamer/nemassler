| Field | Size | Description | Endian |
|-------|------|-------------|--------|
| Magic Header | 10 bytes |
| Key Length | 4 bytes | RC4 key length encrypted with Aes128 | Little Endian |
| Key Data | Key Length bytes | xor with 0x64 <br /> decrypt with aes128 <br />drop first 17 bytes("neteasecloudmusic") <br /> take the rest as key |
| Music Info Length | 4 bytes |  | Little Endian |
| Music Info Data | Music Info Length bytes | xor with 0x63 <br /> drop first 22 bytes <br /> decrypt with base64 <br /> decrypt with aes128 <br /> drop the first 6 bytes <br /> get the rest bytes as json string |
| CRC | 4 bytes | drop |
| Gap | 5 bytes | drop |
| Image Size | 4 bytes |  | Little Endian |
| Image Data | Image Size bytes |
| Music Audio Data | read to end bytes | use Key Data to decrypt <br /> 1.RC4 KSA to generate S-Box <br /> 2. use S-Box to decrypt the data