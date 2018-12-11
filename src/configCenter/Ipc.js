const { ipcMain } = require('electron')

ipcMain.on('me', (event, arg) => {
  event.sender.send('asynchronous-reply', arg)
})
