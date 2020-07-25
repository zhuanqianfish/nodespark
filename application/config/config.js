var dbConfig = require('./database.js');
var routerConfig =  require('./router.js');

var config = {
    port        :   3000,
    app_debug   :   true,
    database    :   dbConfig,
    routerConfig:   routerConfig,

};


module.exports = config;