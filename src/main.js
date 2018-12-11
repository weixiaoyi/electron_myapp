// require('electron-reload')(__dirname, {
//   electron: require('${__dirname}/../../node_modules/electron')
// })

const App = require('./configCenter/App')

require('./configCenter/Ipc')

new App()
