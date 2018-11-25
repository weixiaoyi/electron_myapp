const Window = require('./Window')
const { app, } = require('electron')

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
      width: 1900,
      height: 900,
      url: `file://${__dirname}/../distSource/index.html`
    })
  }

}


module.exports = App
