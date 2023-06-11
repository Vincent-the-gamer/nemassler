if (require('electron-squirrel-startup')) return

require('./app.js')

const { app, BrowserWindow, Menu } = require('electron')
const path = require("path")

function start() {
  // Hide Menu
  if(process.platform === "darwin"){
    // on macOS: Hide Menu by setting it to a empty array
    const menu = Menu.buildFromTemplate([])
    Menu.setApplicationMenu(menu)
  }
  else Menu.setApplicationMenu(null)

  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "./buildIcon/icon.png"),
    width: 1280,
    height: 720,
    webPreferences:{ 
        nodeIntegration: true, 
        contextIsolation: false, 
        enableRemoteModule: true, 
    },
  });

  mainWindow.on('close', () => {
    mainWindow = null
  })
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
  if (mainWindow === null) {
    start()
  }
})

app.on('ready', start)

