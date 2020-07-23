const Koa = require('koa');
const app = new Koa();
const router = require('koa-router');
const fs = require('fs');

//定义环境
const SPARK_PATH = __dirname + '/';
const APP_PATH = __dirname + '/../';
const APP_DIR = 'application';
const LIB_DIR = 'library';
const LANG_DIR = 'lang';


//加载配置
var conversion = require('./conversion.js');    //默认配置
var common = require('./' + LIB_DIR + '/common.js');

//加载路由
//var conversion = require('./conversion.js');
//var common = require('./router.js');

var appModules = {};        //模块
var appControllers = {};    //控制器
var appModels = {};         //模型

//console.log(conversion);
// module.exports = router

// 定义子路由
const router_children = new router()
router_children.get('/get', function (ctx, next) {
    ctx.body = 'this is a get response from router.use!'
})


// 根路由
const router_root = new router()
// 在根路由中注册子路由
router_root.use('/root', router_children.routes(), router_children.allowedMethods())
// 在app中注册根路由
app.use(router_root.routes(), router_root.allowedMethods())


module.exports = app

//运行服务器
app.run = function(port=3000){
    app.listen(3000)
}