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
var config = conversion;
var common = require('./' + LIB_DIR + '/common.js');


//加载路由
//var conversion = require('./conversion.js');
//var common = require('./router.js');

var appModules = {};        //模块
var appControllers = {};    //控制器
var appModels = {};         //模型

//console.log(conversion);
// module.exports = router

var IndexController = require(APP_PATH + APP_DIR+ '/Index/Controller/index.js');
console.log(APP_PATH + APP_DIR+ '/Index/index.js');
var cc  = new IndexController()
console.log(1111);
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(cc)));
// 定义子路由
const router_children = new router()
router_children.get('/:controller/:action', function (ctx, next) {
    if(common.checkStrName(ctx.params.controller) && common.checkStrName(ctx.params.action)){
        var contorllerName = ctx.params.controller; 
        var actionName = ctx.params.action;
        var contorller = eval("new " + contorllerName +"Controller()");
        contorller.ctx = ctx; //传入ctx
        ctx.body = eval('contorller.' + actionName +'()');
    }else{
        ctx.body = '非法输入!';
    }
   // ctx.body = 'this is a get response from router.use!'
   console.log('ok');

})

router_children.get('/:controller/test', function (ctx, next) {
   ctx.body = 'this is a test function!'
})


// 根路由
const router_root = new router()
// 在根路由中注册子路由
router_root.use('', router_children.routes(), router_children.allowedMethods())
// 在app中注册根路由
app.use(router_root.routes(), router_root.allowedMethods())


module.exports = app

//运行服务器
app.run = function(port=3000){
    app.listen(3000, function(){
        console.log('Spark run at port :' + port);
    })
}