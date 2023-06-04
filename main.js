/**
 * 主服务
 */
const express = require("express")
const ncm2mp3 = require("./ncm2mp3")
const readFiles = require("./readFiles")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use( express.static("./public") )

// ncm转mp3
app.post("/customNcm2mp3", (req, res) => {
    try{
        ncm2mp3.ncm2mp3CustomDirectory(
            req.body.ncmDir,
            req.body.mp3OutDir,
            req.body.songCoverOutDir
        )
    }
    catch(err){
        res.send({
            code: 500,
            err
        })
    }
    res.send({
        code: 200,
        msg: "转换成功！！！"
    })
})

// 扫描mp3文件夹
app.get("/readFiles",async (req, res) => {
    const files = await readFiles.readFiles(req.query.mp3Dir)
    res.send({
        files
    })
})

// 读取单个文件
app.post("/readSingleFile",async (req, res) => {
    const buffer = await readFiles.readSingleFile(req.body.mp3Dir, req.body.mp3FileName)
    res.send({
        buffer
    })
})

app.listen(8080, () => {
    console.log("Server started at: http://localhost:8080")
})