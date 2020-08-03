const Koa = require('koa');
const app = new Koa();
const router = require('koa-router');
const fs = require('fs');
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'root',
      database : 'litesite'
    }
});
//const render = require('koa-art-template');

//定义环境

const LIB_DIR = 'library';
const LANG_DIR = 'lang';
const SPARK_PATH = __dirname + '/';
const LIB_PATH = SPARK_PATH + LIB_DIR + '/';

//加载配置 
var conversion = require('./conversion.js');    //默认配置
var config = '';    //
var common = require('./' + LIB_DIR + '/common.js');

//数据库引擎初始化
// knex({
//     client: 'mysql',
//     connection: {
//       host : '127.0.0.1',
//       user : 'root',
//       password : 'root',
//       database : 'litesite'
//     }
// });

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
     router_children.all('/:module/:controller/:action', function (ctx, next) {
        ctx.moduleName = ctx.params.module;
        ctx.controllerName = ctx.params.controller;
        ctx.actionName = ctx.params.action;
        
        //安全检查
        if(!(common.checkStrName(ctx.params.module) && common.checkStrName(ctx.params.controller) && common.checkStrName(ctx.params.action)) ){
             ctx.body = 'illegal input!'; return;
        }
        //加载并实例化控制器
        let AppController = require(config.appPath + config.app_dir + '/' + ctx.moduleName + '/controller/' + ctx.controllerName + '.js');
        
        //修改上下文以适应框架控制器
        ctx.config = config;
        
        let templateEngine = require(LIB_PATH + 'template.js');

        AppController.__ctx = ctx;  //导入上下文
        AppController.__ctx.viewData = {};
        AppController.__ctx.templateEngine = templateEngine;    //导入模板引擎
        AppController.__ctx.db = knex;    //导入数据库引擎
        AppController.__init();     //执行初始化赋值
         ctx.body =  eval('AppController.' +   ctx.actionName + "()");
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