const http = require('http');
const router = require('./router');

var express = () => {
  var app = {
    get: (path, callback) => {
      router.get(path, (req, res) => {
        callback(req, res);
      });
    },

    post: (path, callback) => {
      router.post(path, (req, res) => {
        callback(req, res);
      });
    },

    put: (path, callback) => {
      router.put(path, (req, res) => {
        callback(req, res);
      });
    },

    patch: (path, callback) => {
      router.patch(path, (req, res) => {
        callback(req, res);
      });
    },

    delete: (path, callback) => {
      router.delete(path, (req, res) => {
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
