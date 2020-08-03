//index控制器
let SpartController = require('../../../nodespark/library/controller.js');
class Index extends SpartController{

    constructor(){
        super();
    }

    async index(){
        console.log('in Index/index');
        var req_query = this.query;


        var res = await this.db('li_user').limit(3);
                        // .then((rows)=>{
                        //     var data = JSON.parse( JSON.stringify(rows));
                        //     console.log(data);
                        // })
                        
         
        // this.assign('itemList', res );
        console.log(res);
        this.assign('aaa',  req_query.aa);
        this.assign('bbb',  'bbb');
        //this.assign('itemList',  [{id:1,username:'aa'}]);
        //return  this.view();
        return 1111;
    }

    ccc(par3 = 1){
        console.log(par3);
        return 'in Index/ccc';
    }
}



module.exports = new Index();