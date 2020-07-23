//index控制器
let SpartController = require('../../../nodespark/library/controller.js');


let Index = class Index extends SpartController{
    constructor(){
        super();
        console.log('run in Index/constructor');
    }

    index(){
        console.log(this.ctx);
        console.log('in Index/index');
        return 'in Index/index';
    }


    aaa = 'aaa';
    bbb = 'bbb';
    ccc(par1, par2, par3 = 1){
        console.log(par3);
    }
}

module.exports = Index;