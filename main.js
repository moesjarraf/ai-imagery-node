// vars
const path          = require('path');
const express       = require('express');
const expressApp    = express();
const server        = require('http').Server(expressApp);
const electron      = require('electron');
const electronApp   = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

process.env.root = path.normalize(__dirname);

// init express
expressApp.use(express.static(process.env.root));

expressApp.use(function (req, res) {
  res.sendFile(path.join(process.env.root, '/src/app/app.html'));
});

server.listen(5000, () => {
  // init electron
  function createWindow () {
    mainWindow = new BrowserWindow({width: 1280, height: 720});
    mainWindow.loadURL(`http://localhost:5000`);
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
      mainWindow = null;
    })
  }

  electronApp.on('ready', createWindow)

  electronApp.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      electronApp.quit();
    }
  })

  electronApp.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  })
})
