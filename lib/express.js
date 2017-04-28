const url = require('url');
const http = require('http');
const parser = require('./parser');

let Router = {};

Router.methods = [
  'get',
  'post'
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
      if (method !== 'get') {
        _extractPostData(req, resolve);
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
    listen: function(port, host, callback) {
      const server = http.createServer(Router.handle);
      server.listen(port, host, callback);
    }
  }
}
