const { app, BrowserWindow, Menu } = require("electron")
const path = require("path")

function start() {
  // Hide Menu
  if(process.platform === "darwin"){
    // on macOS: Hide Menu by setting it to a empty array
    const menu = Menu.buildFromTemplate([])
    Menu.setApplicationMenu(menu)
  }
  else Menu.setApplicationMenu(null)

  // @ts-expect-error
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "./buildIcon/icon.png"),
    width: 1280,
    height: 720,
    webPreferences:{ 
        nodeIntegration: true, 
        contextIsolation: false, 
        // @ts-expect-error
        enableRemoteModule: true, 
    },
  });

  // @ts-expect-error
  mainWindow.on('close', () => {
    // @ts-expect-error
    mainWindow = null
  })
  // @ts-expect-error
  mainWindow.loadURL(`http://127.0.0.1:8080`);
};


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // @ts-expect-error
  if (mainWindow === null) {
    start()
  }
})

app.on('ready', start)

