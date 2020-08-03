
let common = require('./library/common.js');
// var appModuleList = common.getAppForder('../application');
// console.log(appModuleList);
// console.log(appModuleList);
//相关教程：
//ES6 :https://es6.ruanyifeng.com/

//koa https://www.itying.com/koa/article-index-id-95.html



var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'root',
      database : 'litesite'
    }
  });

knex('li_user').where({}
).select('*')

.then((rows)=>{
    console.log(rows);
})
  // Finally, add a .catch handler for the promise chain
  .catch(e => {
    console.error(e);
});

//console.log(res);

console.log('end  11211');
