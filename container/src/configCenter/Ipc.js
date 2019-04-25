const { autoUpdater } = require("electron-updater");
exports.checkUpdate=()=>{
  autoUpdater.on("update-downloaded", function() {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.checkForUpdatesAndNotify();
}

