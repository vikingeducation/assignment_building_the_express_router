


var Router = {
	routes: {
		'get': {},
		'post': {}
	}

}






Router.handle = (req, res) => {

  // Get the request's HTTP method
  var method = req.method.toLowerCase();

  // Get the URL path of the request
  var path = url.parse(req.url).pathname;

  // Route matching would happen here
  if (Router.routes[method][path]) {

    // Respond with the correct handler
    // for the HTTP method and path
    Router.routes[method][path](req, res);
  } else {

    // If the handler is not found
    // respond with a 404
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};



