let http = require('http');
var url = require('url');

var Router = {};

// Supported routes
Router.methods = [
  'get'//,
  //'post'
];

// Object to hold registered routes
Router.routes = {};
Router.routes.get = {};

Router.get = (path, callback) => {
  Router.routes.get[path] = callback;
};

// Handles all incoming HTTP requests
Router.handle = (req, res) => {
  // Get the request's HTTP method
  var method = req.method.toLowerCase();
  // "get"

  // Get the URL path of the request
  var path = url.parse(req.url).pathname;
  // "/"

  // Route matching would happen here
  if (Router.routes.get[path]) {
    Router.routes.get[path](req, res);
  } else {

    // If the handler is not found
    // respond with a 404
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

module.exports = Router;
