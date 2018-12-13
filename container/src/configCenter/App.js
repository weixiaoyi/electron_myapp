const Window = require('./Window')
const { app, } = require('electron')

const { autoUpdater } = require("electron-updater")

class App {
  constructor() {
    this.app = app
    this.init()
  }

  init() {

    if (require('electron-squirrel-startup')) {
      this.app.quit();
    }

    this.app.on('ready', () => {
      this.createWindow()
      autoUpdater.checkForUpdatesAndNotify()
    });

    this.app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        this.app.quit();
      }
    });

    this.app.on('activate', () => {
      if (this.window === null) {
        this.createWindow()
      }
    });
  }

  createWindow() {
    this.window = new Window({
      width: 600,
      height: 900,
      url: `http://localhost:8000/#/`,
      //url: `file://${__dirname}/../distSource/index.html`
    })
  }
}


module.exports = App
