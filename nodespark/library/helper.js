//辅助方法
const fs = require('fs');
var helper = {
    //读取文件内容
    getFileContents : function(filePath){
        return  fs.readFileSync(filePath, "utf-8");
    }

    //
}

module.exports = helper;