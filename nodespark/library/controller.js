//基础类
let  SparkController = class SparkController{
    ctx = null; //koa 的上下文
    helper = 123;
    constructor(){
        console.log('run in SparkController');
    }
}

module.exports = SparkController;