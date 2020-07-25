//基础类
//var templateEngine = require('./template');


let  SparkController = class SparkController{
    __ctx = null; //koa 的上下文
    constructor(){
        console.log('run in SparkController');
    }

    //实例化控制器对象后初始化
    __init(){
        this.request = this.__ctx.request;
        this.queryString = this.__ctx.queryString;
    }

   view(){
       return 'in view'
   }
}

module.exports = SparkController;