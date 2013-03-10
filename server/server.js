global.settings = require('./settings');
global.db = require('./db');

var net = require('net'),
	network = require('./network'),
	clients = {};

var Server = function()
{
	this.start = function()
	{
		db.initDatabase();
		net.createServer(function(connection)
		{
			var remoteAddress = connection.remoteAddress;
			var remotePort = connection.remotePort;
			var Token = remoteAddress + ':' + remotePort
			
			connection.setEncoding('UTF-8');
			connection.on("connect", function() 
			{
				console.log('connected : ' + Token);
				var client = new network();
				client.emit('connect', connection);
				clients[Token] = client;
			});
		    
		    connection.on('data', function(data)
		    {
		    	clients[Token].emit('recv', data);
		    });
		
		    connection.on('close', function(data)
		    {
		        console.log('close : ' + Token);
		        delete clients[Token];
		        console.log(clients);
		    });
		    
		}).listen(settings.PORT, settings.HOST);
		console.log('Server listening on ' + settings.HOST + ' : ' + settings.PORT);
	}
}

module.exports.Server = new Server();
