var http = require('http');
var router = require('./router')


app = {};

app.listen = (port, host, callback) => {
  server = http.createServer(router.handle);
  server.listen(port, host, callback);
};

var express = () => {
  router.buildRoutes(app);
  return app;
};

module.exports = express;