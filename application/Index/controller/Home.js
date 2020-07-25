//index控制器
let SpartController = require('../../../nodespark/library/controller.js');


let Home = class Home extends SpartController{
    constructor(){
        super();
        console.log('run in Index/constructor');
    }

    userIndex(){
        console.log(this.ctx);
        console.log('in Index/index');
        return 'in Index/index';
    }


    aaa = 'aaa';
    bbb = 'bbb';
    home(par1, par2, par3 = 1){
        console.log(par3);
    }
}

module.exports = new Home();