var http = require('http');

function express() {
  app = {};

  app.get = function() {};

  app.listen = function(port, host) {
    var server;
    server = http.createServer(app.handle);
    server.listen(port, host, () => {
      console.log('Listening on ' + port);
    });
  };

  app.routes = {
    get: {
      '/': function(path, callback) => {

      }
    },
    post: {
      '/': function() {}
    }
  };

  //Router.get = (path, callback) => {
  //  Router.routes.get[path] = callback;
  //};
}

  // Router[method] = (path, callback) => {
  //   Router.routes[method][path] = callback;
  return app;
}

module.exports = express;
