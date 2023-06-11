/**
 * Main Service
 */
const express = require("express")
const ncm2mp3 = require("./ncm2mp3")
const readFiles = require("./readFiles")
const fileUtils = require("./fileUtils")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use( express.static("./public") )

// ncm to mp3
app.post("/customNcm2mp3", async (req, res) => {
    try{
        Promise.all([
            fileUtils.ensureDirectoryExists(req.body.ncmDir),
            fileUtils.ensureDirectoryExists(req.body.mp3OutDir),
            fileUtils.ensureDirectoryExists(req.body.songCoverOutDir)
        ]).then(([r1,r2,r3]) => {
            ncm2mp3.ncm2mp3CustomDirectory(
                req.body.ncmDir,
                req.body.mp3OutDir,
                req.body.songCoverOutDir
            )
        })
    }
    catch(err){
        res.send({
            code: 500,
            err
        })
    }
    res.send({
        code: 200,
        msgEn: "Transform success! Wait 1s for page refreshment....",
        msgZh: "转换成功！等待一秒后页面刷新....."
    })
})

// scan mp3 folder
app.get("/readFiles",async (req, res) => {
    const files = await readFiles.readFiles(
        req.query.mp3Dir,
        req.query.ncmDir,
        req.query.songCoverDir
    )
    res.send({
        files
    })
})

// read mp3 file
app.get("/getMp3File", (req, res) => {
    const filePath = req.query.filePath
    res.sendFile(filePath)
})


app.listen(8080, () => {
    console.log("Server started at: http://127.0.0.1:8080")
})

