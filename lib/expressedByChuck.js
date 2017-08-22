var http = require('http');

var returnApp = () => {
  var app = {};

  app.get = (path, callback) => {
    app.get[path] = callback;
  };

  app.handle = (req,res) => {
    var method = req.method.toLowerCase();
    if (req.url === '/favicon.ico') {
      //console.log("load favicon here");
    }
    else {
      //console.log(req.url, "<--Not icon");
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
    var match = path.match(/:(\w+)/);
    if (match) {
      if (app.matchingPaths[match[1]]) {
        var replaceMatch = app.matchingPaths[match[1]];
        path = path.replace(match[0], replaceMatch);
        if (app.get[path] === undefined) {
          console.log("Need To add path");
          path = '/';
        }
      }
    }
    return path;
  };

  app.matchingPaths = {
    'yeahh': '1'
  };

  return app;
}

module.exports = returnApp;
