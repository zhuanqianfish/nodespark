const Koa = require('koa');
const app = new Koa();
const router = require('koa-router');
const fs = require('fs');
const render = require('koa-art-template');

//定义环境
const SPARK_PATH = __dirname + '/';
//const APP_PATH = __dirname + '/../';
//const APP_PATH = 'D:/MyProject/nodespark/';
const LIB_DIR = 'library';
const LANG_DIR = 'lang';


//加载配置 
var conversion = require('./conversion.js');    //默认配置
var config = '';    //
var common = require('./' + LIB_DIR + '/common.js');

//自动加载
//var autoLoader= require('./' + LIB_DIR + '/autoLoader.js');
//加载路由
//var conversion = require('./conversion.js');
//var common = require('./router.js');

// var appModules = {};        //模块      ??
// var appControllers = {};    //控制器
// var appModels = {};         //模型

//console.log(conversion);
/*
 //模板渲染引擎
    render(app, {
        root: config.appPath,
        extname: '.html',
        debug: process.env.NODE_ENV !== 'production'
    });
*/
//app初始化
app.use(async (ctx, next) => {
    console.log('========1111111111======');
    config = Object.assign(conversion, config); //合并配置
    //console.log(config);
    await next();
});


//执行路由
app.use(async (ctx, next) => {
    // 定义子路由-自动路由
    const router_children = new router()
    router_children.get('/:module/:controller/:action', function (ctx, next) {
        let moduleName = ctx.params.module;
        let controllerName = ctx.params.controller;
        let actionName = ctx.params.action;
        //安全检查
        if(!(common.checkStrName(moduleName) && common.checkStrName(controllerName) && common.checkStrName(actionName)) ){
             ctx.body = 'illegal input!'; return;
        }
        //加载并实例化控制器
        let AppController = require(config.appPath + config.app_dir + '/' + moduleName + '/controller/' + controllerName + '.js');
        
        //修改上下文以适应框架控制器
        ctx.moduleName = moduleName;
        ctx.controllerName = controllerName;
        ctx.actionName = actionName;
        
        //配置模板渲染引擎
        render(app, {
            root: config.appPath + config.app_dir + '/' + moduleName + '/view/' + controllerName,
            extname: '.html',
            debug: process.env.NODE_ENV !== 'production'
        });

        AppController.__ctx = ctx;  //导入上下文
        AppController.__init();     //执行初始化赋值
        console.log(actionName);
        ctx.body =  eval('AppController.' +  actionName + "()");
    })

    // 根路由
    const router_root = new router();
    // 在根路由中注册子路由
    router_root.use('', router_children.routes(), router_children.allowedMethods());
    // 在app中注册根路由
    app.use(router_root.routes(), router_root.allowedMethods());
    await next();

})




//运行服务器
app.run = function(conf){
    config = conf;   //配置信息,外部变量
    app.listen(config.port, function(){
        console.log('Spark run at port :' + config.port);
    });
}
module.exports = app