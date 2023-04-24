/**
 * 主服务
 */
const express = require("express")
const ncm2mp3 = require("./ncm2mp3")
const readFiles = require("./readFiles")

const app = express()

app.use( express.static("./public") )

app.get("/ncm2mp3", (req, res) => {
    try{
        ncm2mp3.ncm2mp3()
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

app.get("/readFiles",async (req, res) => {
    const files = await readFiles.readFiles()
    res.send({
        files
    })
})

app.listen(8080, () => {
    console.log("服务已启动：http://localhost:8080")
})