module.exports = {
    packagerConfig: {
        name: 'Nemassler',
        executableName: 'Nemassler',
        // 不用加后缀，但是需要准备3个文件，
        // win: icon.ico, mac: icon.icns, linux: icon.png，打包时自动识别，linux 在BrowserWindow构造参数中设置
        icon: "./buildIcon/icon",
        extraResource: ["./frontend/dist"]
    },
    makers: [
        // Windows 
        { 
            // zip target没有配置项
            name: "@electron-forge/maker-zip",
            platforms: ["win32"]
        },
        // macOS
        {
            name: "@electron-forge/maker-dmg",
            platforms: ["darwin"],
            config: {
                format: 'ULFO',
                icon: "./buildIcon/icon.icns"
            }
        },
        // Linux
        {
            name: "@electron-forge/maker-rpm",
            platforms: ["linux"],
        },
        {
            name: "@electron-forge/maker-deb",
            platforms: ["linux"],
        },
    ]

}