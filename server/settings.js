module.exports.HOST = '0.0.0.0';
module.exports.PORT = 1234;

module.exports.PROJECT_PATH = __dirname + '/';
module.exports.LOG_FILE_PATH = [this.PROJECT_PATH, 'log/', 'log.txt'].join('');
module.exports.VIEW_FILE_PATH = [this.PROJECT_PATH, '../', 'view.js'].join('');

module.exports.DATABASE = {
    'type':'mysql', 
    'dbname':'', 
    'username':'', 
    'password':'', 
    'host':'', 
    'port':3306
};
