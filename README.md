# Audio Tools

Powered By [Alpine.js](https://alpinejs.dev/)

中文文档: [README_ZH.md](./README_ZH.md)

This tool pack is a workflow that transfer netease music `.ncm` format audio to `.mp3`, and then you can calculate `beats per minute(BPM)` of these songs.

## Usage
This repo needs `Node.js`, please install it first.

Download Node.js: [https://nodejs.org/en](https://nodejs.org/en)


### Git Clone
~~~shell
git clone https://github.com/Vincent-the-gamer/audio-tools.git
~~~

### Install Dependency
~~~shell
yarn install
~~~

### Run Code
~~~shell
yarn start
~~~


### Get Started

#### Page Overview

![page](./.github/page.png)

You can choose either `English` or `Simplified Chinese` now.

#### ncm -> mp3
Run your code, then access: `http://localhost:8080`

put your `.ncm` files in `ncm` directory, then click the `Convert All` button

mp3 files and song cover will be generated in `public/mp3` directory.

#### Calculate BPM（beats per minute）
choose your generated `.mp3` audios, or import your own `.mp3` audios into `public/mp3` directory to calculate BPM.