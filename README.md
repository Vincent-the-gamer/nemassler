<p align="center">
  <img src="./.github/TitleLogo.png" width="200" height="200"/>
</p>
<h1 align="center">Nemassler</h1>

Waiting for update...

Powered By [Alpine.js](https://alpinejs.dev/)

中文文档: [README_ZH.md](./README_ZH.md)

This tool pack has 2 modules now:
1. Transfer netease music `.ncm` format audio to `.mp3`
2. Calculate `beats per minute(BPM)` of these songs.

## Usage
This repo needs `Node.js`, please install it first.

Download Node.js: [https://nodejs.org/en](https://nodejs.org/en)


### Git Clone
~~~shell
git clone https://github.com/Vincent-the-gamer/audio-tools.git
~~~

### Install Dependency
~~~shell
npm install
~~~



### Get Started

#### Page Overview

![page](./.github/page.png)

You can choose either `English` or `Simplified Chinese` now.

#### ncm -> mp3
Run your code, then access: `http://localhost:8080`

put your `.ncm` files in `your custom ncm input folder`, then click the `Convert All` button

mp3 files and song cover will be generated in `your custom mp3 output folder`.

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
choose your generated `.mp3` audios, or import your own `.mp3` audios into `your custom mp3 output folder` to calculate BPM.