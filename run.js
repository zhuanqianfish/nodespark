//power by nodespark
//启动命令：
//node run.js
let server = require('./nodespark/server.js');

let appPath = __dirname + '/';

let appconfig = require(appPath + 'application/config/config.js');
appconfig.appPath = appPath;

//开始运行
server.run(appconfig);