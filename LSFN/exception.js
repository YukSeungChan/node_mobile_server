function getReturnForm(code, reason)
{
    return {status : {code : code, reason : reason}};       
}

module.exports.ParameterNotFoundError = function(reason)
{
    return getReturnForm('ParameterNotFoundError', reason);
}

module.exports.ProtocolNotFoundError = function(reason)
{
    return getReturnForm('ProtocolNotFoundError', reason);
}

module.exports.InvaildParameterError = function(reason)
{
    return getReturnForm('InvaildParameterError', reason);
}

