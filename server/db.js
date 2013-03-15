var settings = require('./settings'),
    Sequelize = require('sequelize');

var DatabaseManager = function()
{
	this.initDatabase = function()
	{
	    this.session = new Sequelize(settings.DATABASE['dbname'], settings.DATABASE['username'], settings.DATABASE['password'], {
			host: settings.DATABASE['host'],
			port: settings.DATABASE['port'],
			maxConcurrentQueries:300,
			sync: { force: false },
		});
	}
	
	this.getSession = function()
	{
		return this.session;
	}
	
}

DatabaseManager.instance = null;
DatabaseManager.getInstance = function()
{
	if(this.instance === null)
	{
		this.instance = new DatabaseManager();
	}
	return this.instance;
}
module.exports = DatabaseManager.getInstance();
