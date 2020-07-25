const fs = require('fs');
module.exports = {
    test2 : function (){
        console.log('just test2')
    }
}


const files = fs.readdirSync('../application/index')
sysDirList = ['common','config'];
var components= [];
files.forEach(file => {
    fs.statSync('../application/index/' + file, function(err,stats){
        if(stats.isDirectory()){
            //如果是文件夹，那么放入数组。不是，什么也不做。
            components.push(file);

            console.log(components);
        }
    });
})



let common = require('./library/common.js');
var appModuleList = common.getAppForder('../application');
console.log(appModuleList);
// console.log(appModuleList);
//相关教程：
//ES6 :https://es6.ruanyifeng.com/

//koa https://www.itying.com/koa/article-index-id-95.html
console.log('end  11211');
