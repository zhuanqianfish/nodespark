var fs = require('fs');
var path = require('path');
//////没有用到！！！
var load = function(path, name) {
    if (name) {
        tempObj = require(path + name);
        //tempObj.className =  name;
        return tempObj;
    }
    return require(path)
};


module.exports = function (dir) {
    if(!fs.existsSync(dir)){
        return false;
    }
    patcher = {}
    fs.readdirSync(dir).forEach(function (filename) {
        if (!/\.js$/.test(filename)) {
            return;
        }
        var name = path.basename(filename, '.js');
        var _load = load.bind(null, dir + '/', name);
        patcher.__defineGetter__(name, _load);
    });
    return patcher;
};


