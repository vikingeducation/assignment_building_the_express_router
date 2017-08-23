var http = require('http');

var Router = {
  initializeApplication: function (app) {
    app.get = function (path, callback) {
    }
  },

  handle: function (res, req, next) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
  }

}

module.exports = Router;
