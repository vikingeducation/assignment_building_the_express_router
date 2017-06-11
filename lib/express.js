const http = require('http');
var router = require('./router');

//returns app object
module.exports = () => {
  var app = {

    listen: (port, callback) => {
      var server = http.createServer(router.handle);

      server.listen(port, callback);
    },

    get: (path, callback) => {
      router.get(path, callback);
    },

    post: (path, callback) => {
      router.post(path, callback);
    }
  }

  return app;
}
