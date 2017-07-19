var http = require('http');
var url = require('url');
const parsePaths = require('./parsePaths');

const verbs = ['get'];

Router = {};

Router.routes = {};

// Instatiate server
Router.listen = function(port, host, callback) {
  var server = http.createServer(Router.handle);
  server.listen(port, host, callback);
};

// Build HTTP verb methods
verbs.forEach(verb => {
  Router.routes[verb] = Router.routes[verb] || {};

  Router[verb] = (path, callback) => {
    pathRegex = parsePaths(path);
    Router.routes[verb][pathRegex.source] = callback;
  };
});

// Route requests
Router.handle = function(req, res) {
  console.log('handling');
  const verb = req.method.toLowerCase();
  let path = url.parse(req.url).pathname;

  // Remove trailing slashes
  if (path.length > 1 && path[path.length - 1] === '/') {
    path = path.slice(0, path.length - 1);
  }

  // Iterate over the path regexes for our given verb
  // testing them against the current path
  var found = false;
  for (let routerPath in Router.routes[verb]) {
    let pathRegex = new RegExp(routerPath);
    if (pathRegex.test(path)) {
      // Path matches! Route away...
      found = true;
      Router.routes[verb][routerPath](req, res);
      break;
    }
  }
  if (!found) {
    res.statusCode = 404;
    res.end('404 NOT FOUND, LOSER');
  }
};

module.exports = Router;
