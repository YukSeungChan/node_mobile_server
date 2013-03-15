var settings = require('./settings'),
    winston = require('winston'),
    logger = new (winston.Logger)({
        transports: [
            // Console transport      
            new (winston.transports.Console)(),
    
            // File transport 
            new (winston.transports.File)({
                filename: settings.LOG_FILE_PATH
            })
        ]
    });

module.exports = logger;