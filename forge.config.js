module.exports = {
    packagerConfig: {
        name: 'Nemassler',
        executableName: 'Nemassler',
        icon: "./buildIcon",
        extraResource: ["./frontend/dist"]
        
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                name: "Nemassler",
            }
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: [
                "darwin"
            ],
        },
        {
            name: "@electron-forge/maker-deb",
            config: {}
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {}
        }
    ]

}