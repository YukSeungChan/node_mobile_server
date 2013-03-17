var util = require('util'),
    events = require('events'),
    clientEmitter = events.EventEmitter,
    exception = require('./exception');    
    
function Request(data)
{   
    try
    {
        this.data = JSON.parse(data)
    }
    catch(error){
        this.data = new Object();
    }
    this.getParameter = function(key, is_required)
    {
        var value = this.data[key];
        if(value == null && is_required){
            throw new exception.ParameterNotFoundError(key);
        }
        return value;
    }
}

function RequestProcessor(connection, request)
{ 
    var domain = require('domain').create(),
        connection = connection;
        
    this.request = request;
    this.response = new Object();
    
    domain.on('error', function(error) 
    {
        this.response.status = error.status;
        connection.write(this.toJSON(this.response));
        domain.dispose();
    }.bind(this));
    
    this.getResponse = domain.bind(function(callback)
    {
        var view = require(settings.VIEW_FILE_PATH);
        var protocol = this.request.getParameter('protocol', true);
        this.response.protocol = protocol;
        
        view.getView(this.request,  protocol, function(viewResult)
        {
            this.response = util._extend(this.response, viewResult);
            this.response.status = {code:"OK", reason:"OK"};
            callback(this.toJSON(this.response));
        }.bind(this));      
        
        delete require.cache[require.resolve(settings.VIEW_FILE_PATH)];     
    });
    
    this.toJSON = function(object)
    {
        return JSON.stringify(object, null, 0);
    }
}

function Client() {
    
    if ((this instanceof Client) === false) {
        return new Client();
    }
    clientEmitter.call(this);
    
    this.on('connect', function(connection){
        this.connection = connection;
    });
    
    this.on('recv', function(data)
    {
        new RequestProcessor(this.connection, new Request(data)).getResponse(function(response)
        {
            this.emit('send', response);
        }.bind(this));
    });
    
    this.on('send', function(data)
    {
        this.connection.write(data)
    });
};

util.inherits(Client, clientEmitter);
module.exports = Client;
