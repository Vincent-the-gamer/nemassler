<p align="center">
  <img src="./.github/TitleLogo.png" width="200" height="200"/>
</p>
<h1 align="center">Nemassler</h1>

文档即将更新...

Node.js版本：18.14.0

本项目前端使用[Alpine.js](https://alpinejs.dev/)开发

English Version: [README.md](./README.md)

这个工具主要有俩功能:
1. 把某yy音源的`.ncm` 格式音频转换为`.mp3`格式。
2. 计算`.mp3`格式音频的`每分钟节拍数(BPM)`。

## 使用
该项目依赖`Node.js`,请先安装

Node.js中文网: [http://nodejs.p2hp.com/](http://nodejs.p2hp.com/)


### 拉取项目
~~~shell
git clone https://github.com/Vincent-the-gamer/audio-tools.git
~~~

### 安装依赖
~~~shell
npm install
~~~


### 开始使用

#### 页面总览

![页面](./.github/page-cn.png)

现在，你可以在右上角切换语言了，有`简体中文`和`英语`。

#### ncm -> mp3
启动代码后，访问`http://localhost:8080`页面

把需要转换的ncm全部放入`你的自定义ncm输入文件夹`，然后点击页面:

然后mp3和曲封面会输出到`你的自定义mp3输出文件夹`下，自取就好

#### 默认文件夹路径
* Windows: 
    * ncm: C:\\Users\\public\\ncm
    * mp3: C:\\Users\\public\\mp3
    * songcover: C:\\Users\\public\\songcover
* macOS
    * ncm: /Users/Shared/ncm
    * mp3: /Users/Shared/mp3
    * songcover: /Users/Shared/songcover

#### 计算BPM（每分钟的节拍数）
选择生成的mp3，或者自己手动导入mp3到`你的自定义mp3输出文件夹`都行，这样就可以在页面下拉框找到你的歌曲，然后计算bpm。
