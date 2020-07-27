var helper = require('./helper.js');
//基础类

let  SparkController = class SparkController{
    __ctx = null; //koa 的上下文
    
    constructor(){
        console.log('run in SparkController');
    }

    //实例化控制器对象后初始化
    __init(){
        this.request = this.__ctx.request;
        this.query = this.__ctx.request.query;
        this.queryString = this.__ctx.request.queryString;
    }

    //注册模板数据
    assign(varname, vardata){
        console.log(this.__ctx.viewData);
        this.__ctx.viewData[varname] = vardata;
    }

    //渲染方法
    //templateFile: 模板文件
    //data:数据
    view(templateFile = null , viewData = null){
        //模板文件路径
        if(templateFile == null){
            templateFile = this.__ctx.config.appPath + this.__ctx.config.app_dir + '/' + this.__ctx.moduleName + '/view/' + this.__ctx.controllerName + '/'
                         + this.__ctx.actionName + '.' + this.__ctx.config.template.view_suffix;
        }
        var templateStr = helper.getFileContents(templateFile);
        console.log(templateFile);

        //处理模板数据
        if(viewData == null){
            viewData = this.__ctx.viewData;
        }
        return this.__ctx.templateEngine.render(templateStr, viewData);
    }


    //数据库访问器
    db(dbConfig = null){
        if(dbConfig == null){

        }
    }
}

module.exports = SparkController;