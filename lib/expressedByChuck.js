var http = require('http');

var returnApp = () => {
  var app = {};

  app.get = (path, callback) => {
    app.get[path] = callback;
  };

  app.post = (path, callback) => {
    app.post[path] = callback;
  };

  app.put = (path, callback) => {
    app.post[path] = callback;
  };

  app.patch = (path, callback) => {
    app.post[path] = callback;
  };

  app.delete = (path, callback) => {
    app.post[path] = callback;
  };


  app.handle = (req,res) => {
    var method = req.method.toLowerCase();
    if (req.url === '/favicon.ico') {
    }
    else {
      var path = req.url;
      path = app.matchPath(path);
      if ( app[method][path] ) {
        app[method][path](req,res);
      }
    }
  };

  app.listen = (port, callback) => {
    var server = http.createServer(app.handle);
    server.listen(port, 'localhost', 511,  callback);
  };

  app.matchPath = (path) => {
    var match = path.match(/:(\w+)/g);
    if (match) {
      for (var i = 0; i < match.length; i++){
        if (app.matchingPaths[match[i]]) {
          var replaceMatch = app.matchingPaths[match[i]];
          path = path.replace(match[i], replaceMatch);
        }
      }
      if (app.get[path] === undefined) {
        console.log(`Need To add paths for ${match}`);
        path = '/';
      }
    }
    return path;
  };

  app.matchingPaths = {
    ':yeahh': '1',
    ':yup': '2'
  };

  return app;
}

module.exports = returnApp;
