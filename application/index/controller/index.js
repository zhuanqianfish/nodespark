//index控制器
let SpartController = require('../../../nodespark/library/controller.js');


let Index = class Index extends SpartController{
    aaa = 'aaa';
    bbb = 'bbb';

    constructor(){
        super();
    }

    index(){
        console.log('in Index/index');
        //console.log(this.request);
        let req_query = this.request.query;
        let req_queryString = this.request.queryString;
        console.log(req_query);
        console.log(req_query.a);

        return this.view();
    }

    ccc(par3 = 1){
        console.log(par3);
        return 'in Index/ccc';
    }
}

module.exports = new Index();