# App

### 使用 electron-updater 应用更新说明

- .package.json 的 version 需要更新
- .打包结果需要需要把 app.exe,blobkmap,latestyml 三个文件同时放到服务器某个目录，app 的更新自动根据 package.json 的 publish 字段请求 latestyml 文件，比较更新
