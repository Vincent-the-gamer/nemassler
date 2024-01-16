/**
 * Main Service
 */
// @ts-ignore
const path = require("path")
const express = require("express")
const readFiles = require("./readFiles.ts")
// @ts-ignore
const fileUtils = require("./fileUtils.ts")
const axios = require("axios")
const ncm2mp3 = require("./ncm2mp3.ts")

const expressApp = express()

expressApp.use(express.json())
expressApp.use(express.urlencoded({ extended: false }))
expressApp.use(express.static(
    path.resolve(__dirname, "./frontend/dist")
))

/**
 * Cross Origin
 */
expressApp.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});


// ncm to mp3
expressApp.post("/customNcm2mp3", async (req, res) => {
    try {
        Promise.all([
            fileUtils.ensureDirectoryExists(req.body.ncmDir),
            fileUtils.ensureDirectoryExists(req.body.mp3OutDir),
            fileUtils.ensureDirectoryExists(req.body.songCoverOutDir)
        ]).then(([r1, r2, r3]) => {
            ncm2mp3.ncm2mp3CustomDirectory(
                req.body.ncmDir,
                req.body.mp3OutDir,
                req.body.songCoverOutDir
            )
        })
    }
    catch (err) {
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
expressApp.get("/readFiles", async (req, res) => {
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
expressApp.get("/getMp3File", (req, res) => {
    const filePath = req.query.filePath
    res.sendFile(filePath)
})

// get anime girls picture
expressApp.post("/meizi", (req, res) => {
    const { isR18, num, author_uuid, keyword, tag } = req.body
    let url = `https://sex.nyan.xyz/api/v2?r18=${isR18}&num=${num}`

    author_uuid && (url += `&author_uuid=${author_uuid}`)
    keyword && (url += `&keyword=${keyword}`)
    tag && (url += `&tag=${tag}`)

    axios.get(url).then(({ data }) => {
        res.send(data)
    })
})

// filter mp3
expressApp.post("/filterMp3", async (req, res) => {
    const { directory } = req.body
    const result = await fileUtils.filterMp3(directory)
    res.send(result)
})

expressApp.listen(8080, () => {
    console.log("Server started at: http://127.0.0.1:8080")
})

