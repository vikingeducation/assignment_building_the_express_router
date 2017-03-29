let http = require('http');
let url = require('url');
let parse = require('./pathParser');

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
  // parse the path here
  console.log(Router.routes.get);
  //var pattern = parse(path, Router.routes.get);

  console.log(pattern);

  if (Router.routes.get[path]) {
    Router.routes.get[path](req, res);
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

module.exports = Router;
