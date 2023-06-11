<p align="center">
  <img src="./.github/TitleLogo.png" width="200" height="200"/>
</p>
<h1 align="center">Nemassler</h1>

Powered By [Alpine.js](https://alpinejs.dev/)

中文文档: [README_ZH.md](./README_ZH.md)

This tool pack has 2 modules now:
1. Transfer netease music `.ncm` format audio to `.mp3`
2. Calculate `beats per minute(BPM)` of these songs.

## Usage

### Download
Download application from Release: 

[https://github.com/Vincent-the-gamer/Nemassler/releases](https://github.com/Vincent-the-gamer/Nemassler/releases)

### Get Started

#### Page Overview

![page](./.github/page.png)

You can choose either `English` or `Simplified Chinese` now.

#### ncm -> mp3
put your `.ncm` files in `your ncm input folder`, then click the `Convert All` button

mp3 files and song cover will be generated in `your mp3 output folder`.

#### Default Folders
* Windows: 
    * ncm: C:\\Users\\public\\ncm
    * mp3: C:\\Users\\public\\mp3
    * songcover: C:\\Users\\public\\songcover
* macOS
    * ncm: /Users/Shared/ncm
    * mp3: /Users/Shared/mp3
    * songcover: /Users/Shared/songcover

#### Calculate BPM（beats per minute）
choose your generated `.mp3` audios, or import your own `.mp3` audios into `your mp3 output folder` to calculate BPM.

## Build from source code
~~~shell
git clone https://github.com/Vincent-the-gamer/Nemassler.git

npm install

npm run package
~~~