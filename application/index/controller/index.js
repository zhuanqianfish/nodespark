//index控制器
let SpartController = require('../../../nodespark/library/controller.js');
class Index extends SpartController{
    aaa = 'aaa';
    bbb = 'bbb';

    constructor(){
        super();
    }

    index(){
        console.log('in Index/index');
        var req_query = this.query;
        this.assign('aaa', 'aaa变量' + req_query.aa);
        return this.view();
    }

    ccc(par3 = 1){
        console.log(par3);
        return 'in Index/ccc';
    }
}



module.exports = new Index();