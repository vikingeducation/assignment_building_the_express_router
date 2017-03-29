var http = require('http');
var url = require('url');

function express() {

  app = {};

  app.routes = {};

  app.methods = ['get', 'post'];

  app.methods.forEach( function(method) {
    app.routes[method] = {};
    app[method] = function(path, callback) {
      app.routes[method][path] = callback;
    };
  });

  app.listen = function(port, host) {
    var server = http.createServer(app.handle);
    server.listen(port, host, () => {
      console.log('Listening on ' + port);
    });
  };

  app.handle = function(req, res) {
    var method = req.method.toLowerCase();
    var path = url.parse(req.url).pathname;

    if (app.routes[method][path]) {
      app.routes[method][path](req, res);
    } else {
      res.statusCode = 404;
      res.end('404 Not Found');
    }
  };

  //Router.get = (path, callback) => {
  //  Router.routes.get[path] = callback;
  //};

  // Router[method] = (path, callback) => {
  //   Router.routes[method][path] = callback;
  return app;
}

module.exports = express;
