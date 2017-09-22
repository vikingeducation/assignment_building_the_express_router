const http = require('http');
const router = require('./router');

var express = () => {
  var app = {
    get: (path, callback) => {
      router.get(path, (req, res) => {
        callback(req, res);
      });
    },

    listen: (port, callback) => {
      var server = http.createServer(router.handle);

      server.listen(port, 0, () => {
        callback();
      });
    }
  };

  return app;
};

module.exports = express;
