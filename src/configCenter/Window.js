const { BrowserWindow } = require('electron')

class Window {
  constructor({ width, height, url }) {
    this.config = {
      width,
      height,
      url
    }
    this.init()
  }

  init() {
    const { width, height, url } = this.config
    this.window = new BrowserWindow({
      width,
      height,
    });
    this.window.on('closed', () => {
      this.window = null;
    });
    this.loadUrl(url)
    this.openDevTools()
  }

  loadUrl(url) {
    this.window.loadURL(url);
  }
  openDevTools () {
    this.window.webContents.openDevTools();
  }

}


module.exports = Window
