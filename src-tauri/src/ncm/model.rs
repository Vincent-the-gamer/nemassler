use serde::{Deserialize, Serialize};

use crate::NcmDecodeError;

/// An enum to receive possible types of NCM ID. either a string or an integer
#[derive(Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(untagged)]
pub enum NcmId {
    StringLiteral(String),
    Integer(u64),
}

impl NcmId {
    pub fn get_id(self) -> Result<u64, NcmDecodeError> {
        match self {
            NcmId::Integer(id) => Ok(id),
            NcmId::StringLiteral(str_id) => {
                if str_id.is_empty() {
                    return Err(NcmDecodeError::InvalidId);
                }
                str_id.parse().map_err(|_| NcmDecodeError::InvalidId)
            }
        }
    }
}

/// Parse json to the raw struct and convert it to the NcmInfo struct
#[derive(Debug, Deserialize, Eq, PartialEq, Serialize)]
pub struct RawNcmInfo {
    #[serde(rename = "musicName")]
    pub name: String,
    #[serde(rename = "musicId")]
    pub id: NcmId,
    pub album: String,
    pub artist: Vec<(String, NcmId)>,
    pub bitrate: NcmId,
    pub duration: NcmId,
    pub format: String,
    #[serde(rename = "mvId")]
    pub mv_id: Option<NcmId>,
    pub alias: Option<Vec<String>>,
}

/// Stores metadata of a NCM file
#[derive(Debug, Eq, PartialEq)]
pub struct NcmInfo {
    pub name: String,
    pub id: u64,
    pub album: String,
    pub artist: Vec<(String, u64)>,
    pub bitrate: u64,
    pub duration: u64,
    pub format: String,
    pub mv_id: Option<u64>,
    pub alias: Option<Vec<String>>,
}

impl From<RawNcmInfo> for NcmInfo {
    fn from(raw_info: RawNcmInfo) -> Self {
        Self {
            name: raw_info.name,
            id: raw_info.id.get_id().unwrap_or(0),
            album: raw_info.album,
            artist: raw_info
                .artist
                .into_iter()
                .map(|(name, id)| (name, id.get_id().unwrap_or(0)))
                .collect(),
            bitrate: raw_info.bitrate.get_id().unwrap_or(0),
            duration: raw_info.duration.get_id().unwrap_or(0),
            format: raw_info.format,
            mv_id: match raw_info.mv_id {
                Some(id) => match id.get_id() {
                    Ok(inner) => Some(inner),
                    Err(_) => None,
                },
                None => None,
            },
            alias: raw_info.alias,
        }
    }
}

impl From<String> for NcmInfo {
    fn from(json_string: String) -> Self {
        let raw_info = serde_json::from_str::<RawNcmInfo>(&json_string).unwrap();
        NcmInfo::from(raw_info)
    }
}
