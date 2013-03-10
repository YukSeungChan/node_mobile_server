function getReturnForm(code, reason)
{
	return {status : {code : code, reason : reason}};		
}

module.exports.NotFoundParameterError = function(parameter)
{
	return getReturnForm('NotFoundParameterError', parameter);
}

