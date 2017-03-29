let http = require('http');
var url = require('url');

var Router = {};

// Object to hold registered routes
Router.routes = {};
Router.routes.get = {};

Router.get = (path, callback) => {
  Router.routes.get[path] = callback;
};

// Handles all incoming HTTP requests
Router.handle = (req, res) => {
  var method = req.method.toLowerCase();
  var path = url.parse(req.url).pathname;
  if (Router.routes.get[path]) {
    Router.routes.get[path](req, res);
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

module.exports = Router;
