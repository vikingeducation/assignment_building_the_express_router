const url = require('url');
const http = require('http');

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
  if (Router.routes[method][path]) {

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
      Router.routes[method][path](req, res);
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
      Router.routes['get'][path] = callback;
      console.log(Router);
    },
    listen: function(port, host, callback) {
      const server = http.createServer(Router.handle);
      server.listen(port, host, callback);
    }
  }
}
