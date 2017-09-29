const url = require('url');

// Building the Router
let Router = {};

// Object to hold registered routes
Router.routes = {
  get: {}
};

Router.updates = function(path, callback, method) {
  Router.routes[method][path] = callback;
};

// Handles all incoming HTTP requests
Router.handle = (req, res) => {
  // Get the request's HTTP method	
  let method = req.method.toLowerCase();

  // Get the URL path of the request
  let path = url.parse(req.url).pathname;

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

module.exports = Router;