var testView = function(request, protocol, callback)
{
    console.log('call TestView - view.js');
    var response = new Object();
    response['protocol'] =  request.getParameter('protocol', true); 
    response['message'] = 'Hello, This is TestView';
    callback(response);
};

var viewInfo = 
{
    test : testView     
}

module.exports.getView = domain.bind(function(request, callback)
{    
    var protocol = request.getParameter('protocol', true);
    viewInfo[protocol](request, protocol, function(data)
    {
        callback(data); 
    });
});


