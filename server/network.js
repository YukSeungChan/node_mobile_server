var util = require('util'),
    events = require('events'),
    clientEmitter = events.EventEmitter,
    exception = require(settings.PROJECT_PATH + 'exception');    
    
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
            throw new exception.NotFoundParameterError(key);
		}
		return value;
	}
}

function RequestProcessor(connection, request)
{ 
    global.domain = require('domain').create();
    this.connection = connection;
	this.request = request;
	this.response = {status: {code:"OK", reason:"OK"}};
    
    domain.on('error', function(error) 
    {
        this.response.status = error.status
        this.response = JSON.stringify(this.response['status'], null, 0);
        this.connection.write(this.response);
        domain.dispose();
    }.bind(this));
    
	this.getResponse = function(callback)
	{
	    var view = require(settings.VIEW_FILE_PATH);
	    delete require.cache[require.resolve(settings.VIEW_FILE_PATH)];
		view.getView(this.request, function(viewResult)
		{
            if(this.response.status.code == "OK")
            {
                this.response = util._extend(this.response, viewResult);
                this.response = JSON.stringify(this.response, null, 0);  
            }
            else
            {
                this.response = JSON.stringify(this.response.status, null, 0);
            }
            callback(this.response);
        }.bind(this));				
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
