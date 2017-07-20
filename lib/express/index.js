const http = require('http');
const url = require('url');

const parsePaths = require('./parsePaths');
const route = require('./router');
const verbs = ['get', 'post', 'put', 'patch', 'delete'];

Router = {};

Router.routes = {};

// Instatiate server
Router.listen = function(port, host, callback) {
  var server = http.createServer(Router.handle);
  server.listen(port, host, callback);
};

// Route requests
Router.handle = function handle(req, res) {
  // parse url & method, get Data, call route
  console.log('Routing... ... ...');
  let verb = req.method.toLowerCase();
  let path = url.parse(req.url).pathname;
  if (path.length > 1 && path[path.length - 1] === '/') {
    path = path.slice(0, path.length - 1);
  }
  var p = new Promise((resolve, reject) => {
    if (verb !== 'get') {
      _getData(req, resolve);
    } else {
      resolve();
    }
  });
  p.then(() => {
    route(req, res, path, verb, Router.routes);
  });
};

//collect data from request body
_getData = function(req, resolve) {
  let body = '';
  req.on('data', data => {
    body += data;
  });
  req.on('end', () => {
    req.body = body;
    resolve();
  });
};

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
