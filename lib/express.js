const url = require('url');
const http = require('http');
const parser = require('./parser');

let Router = {};

var _extractBodyData = (req, done) => {
  var body = '';
  req.on('data', (data) => {
    body += data;
  });
  req.on('end', () => {
    req.body = body;
    done();
  });
};

Router.methods = [
  'get',
  'post',
  'put',
  'patch',
  'delete'
];

Router.routes = {};

// setup empty routes for each method
Router.methods.forEach((method) => {

  Router.routes[method] = {};

});

Router.handle = (req, res) => {

  // Get the request's HTTP method
  var method = req.method.toLowerCase();

  // Get the URL path of the request
  var path = url.parse(req.url).pathname;

  // Route matching would happen here
  if (newPath = parser.findPath(Router.routes[method], path, req)) {

    // Use a promise to always resolve
    // but allow async post data extraction
    var p = new Promise((resolve) => {
      if (method !== 'get' && method !== 'delete') {
        _extractBodyData(req, resolve);
      } else {
        resolve();
      }
    });

    // Respond with the correct handler
    // for the HTTP method and path
    p.then(function() {
      Router.routes[method][newPath](req, res);
    });
  } else {

    // If the handler is not found
    // respond with a 404
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

module.exports = function() {
  return {
    get: function(path, callback) {
      pathRegex = parser.pathParse(path);
      Router.routes['get'][pathRegex] = callback;
    },
    post: function(path, callback) {
      pathRegex = parser.pathParse(path);
      Router.routes['post'][pathRegex] = callback;
    },
    put: function(path, callback) {
      pathRegex = parser.pathParse(path);
      Router.routes['put'][pathRegex] = callback;
    },
    patch: function(path, callback) {
      pathRegex = parser.pathParse(path);
      Router.routes['patch'][pathRegex] = callback;
    },
    delete: function(path, callback) {
      pathRegex = parser.pathParse(path);
      Router.routes['delete'][pathRegex] = callback;
    },
    all: function(path, callback) {
      pathRegex = parser.pathParse(path);
      Router.routes['get'][pathRegex] = callback;
      Router.routes['post'][pathRegex] = callback;
      Router.routes['put'][pathRegex] = callback;
      Router.routes['patch'][pathRegex] = callback;
      Router.routes['delete'][pathRegex] = callback;
    },
    listen: function(port, host, callback) {
      const server = http.createServer(Router.handle);
      server.listen(port, host, callback);
    }
  }
}
