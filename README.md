<p align="center">
  <img src="./.github/TitleLogo.png" width="200" height="200"/>
</p>
<h1 align="center">Nemassler</h1>
<p align="center">
  A useful multiple function tool! <br/>
  Mainly transform .ncm to .mp3 and calculate audio BPM.
</p>

<p align="center">
  <span style="font-size: 20px;">Powered By</span>
  <br/>
  <a href="https://www.svelte.cn/" target="_blank">
    <img src="./.github/svelte.png"/>
  </a>
  <br/>
</p>

<p align="center">
  <span>English</span>
  <span style="margin: 3px;">|</span>
  <a href="./README_ZH.md" target="_blank">中文文档</a>
</p>

# Installation
Download application from Release: 

**Latest Version: v1.0.4**

[https://github.com/Vincent-the-gamer/Nemassler/releases](https://github.com/Vincent-the-gamer/Nemassler/releases)

Can't open in macOS?
* Open Terminal
* Input `xattr -d com.apple.quarantine `
* Drag the application and drop in Terminal, the directory will be automatically written.
* Press enter(aka return) button!!!
* Re-open the application.

# Page Overview

![page](./.github/page.png)

You can choose either `English` or `Simplified Chinese` now.

# Get Started

## ncm -> mp3
put your `.ncm` files in `your ncm input folder`, then click the `Convert All` button

mp3 files and song cover will be generated in `your mp3 output folder`.

## Default Folders
* Windows: 
    * ncm: C:\\Users\\Public\\ncm
    * mp3: C:\\Users\\Public\\mp3
    * songcover: C:\\Users\\public\\songcover
* macOS
    * ncm: /Users/Shared/ncm
    * mp3: /Users/Shared/mp3
    * songcover: /Users/Shared/songcover
* Linux
    * ncm: /home/{user_name}/Public/ncm
    * mp3: /home/{user_name}/Public/mp3
    * songcover: /home/{user_name}/Public/songcover

## Calculate BPM（beats per minute）
choose your generated `.mp3` audios, or import your own `.mp3` audios into `your mp3 output folder` to calculate BPM.

**And, a funny feature inside, but I can't tell more😁**

# Build from source code
~~~shell
git clone https://github.com/Vincent-the-gamer/Nemassler.git

npm run build-app
~~~

# Changelog
View [Changelog](./CHANGELOG.md)

# License
[MIT](./LICENSE)