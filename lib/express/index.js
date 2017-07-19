const http = require('http');
const parsePaths = require('./parsePaths');
const handler = require('./handler');
const verbs = ['get', 'post'];

Router = {};

Router.routes = {};

// Instatiate server
Router.listen = function(port, host, callback) {
  var server = http.createServer(Router.handle);
  server.listen(port, host, callback);
};

// Route requests
Router.handle = handler;

// Build HTTP verb methods
verbs.forEach(verb => {
  Router.routes[verb] = Router.routes[verb] || {};

  Router[verb] = (path, callback) => {
    var parsedPath = parsePaths(path);
    Router.routes[verb][parsedPath.pathRegex.source] = callback;
    Router.routes[verb][parsedPath.pathRegex.source].params = parsedPath.params;
  };
});

module.exports = Router;
