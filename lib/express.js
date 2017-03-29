const http = require('http');
const url = require('url');
const pathParser = require('../lib/pathParser');

function express() {

  app = {};

  app.routes = {};

  app.methods = ['get', 'post'];

  app.methods.forEach(function(method) {
    app.routes[method] = {};
    app[method] = function(ourPath, callback) {
      app.routes[method][ourPath] = callback;
    };
  });

  app.listen = function(port, host) {
    var server = http.createServer(app.handle);
    server.listen(port, host, () => {
      console.log(`Listening on ${ host }:${ port } ...`);
    });
  };

  app.getParams = function(method, reqPath) {
    var params;
    for (ourPath in app.routes[method]) {
      params = pathParser.getParams(ourPath, reqPath);
      if (params) break;
    }
    return params;
  };

  app.handle = function(req, res) {
    var reqMethod = req.method.toLowerCase();
    var reqPath = url.parse(req.url).pathname;

    var params = app.getParams(reqMethod, reqPath);

    if (app.routes[reqMethod][reqPath] || params) {
      if (params) {
        req.params = params;
        app.routes[reqMethod][params.path](req, res);
      }
      app.routes[reqMethod][reqPath](req, res);
    } else {
      res.statusCode = 404;
      res.end('404 Not Found');
    }
  };

  return app;
}

module.exports = express;
