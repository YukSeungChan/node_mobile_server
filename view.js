var models = require('./models'),
    exception = require('./LSFN/exception'),
    views = new Object();

views.test = function(request, callback)
{
    var response = new Object();
    response['message'] = 'Hello, This is TestView';
    callback(response);
};

module.exports.getView = function(request, protocol, callback)
{    
    if(!views.hasOwnProperty(protocol))
    {
        throw new exception.ProtocolNotFoundError(protocol); 
    }
    views[protocol](request, function(data)
    {
        callback(data); 
    });
};
