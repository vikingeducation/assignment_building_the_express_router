var http = require('http');
var url = require('url');

var returnApp = () => {
  var app = {};

  app.get = (path, callback) => {
    app.get[path] = callback;
  };

  app.handle = (req,res) => {
    var method = req.method.toLowerCase();
    var path = url.parse(req.url).pathname;
    if ( app[method][path] ) {
      app[method][path](req,res);
    }
  };

  app.listen = (port, callback) => {
    var server = http.createServer(app.handle);
    server.listen(port, 'localhost', 511,  callback);
  };

  return app;
}

module.exports = returnApp;
