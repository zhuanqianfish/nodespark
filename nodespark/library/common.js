var fs = require('fs');
var path = require('path');

let commonFunction = {

    //检查输入名称，仅允许A-Z a-Z _ 0-9
    checkStrName : function(input){
        var rex = /^\w+$/;
        return rex.test(input);
    },

    //读取项目目录
    //path：读取的路径
    //sysForderNameList： 需要排除的系统白名单
    getAppForder : function(forder, sysForderNameList = ['common', 'config', 'addon', 'nodespark', 'public']){
        patcher = [];
        if(!fs.existsSync(forder)){
            return false;
        }
        fs.readdirSync(forder + '/' ).forEach(function (filename) {
            if (sysForderNameList.includes(filename)) {
                return;
            }
            var name = path.basename(filename, '.js'); //读取文件夹的最后一部分

          //  var _load = load.bind(null, './' + forder + '/', name);    //
            patcher.push(name);  
        });
        return patcher;
    }
};


module.exports = commonFunction;