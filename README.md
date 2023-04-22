# Audio Tools

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

#### ncm -> mp3
Run your code, then access: `http://localhost:8080`

put your `.ncm` files in `/ncm` file, then click the button:

**English page will be added later...**

![MP3](./.github/toMP3.png)

mp3 files and song cover will be generated in `public/mp3` file.

#### Calculate BPM
Now we need to input `mp3 file name` to calculate. This is so stupid and it will be a `<select>` instead later.