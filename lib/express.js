var http = require("http");
var router = require("./router");

var appObj = {
  get: (path, callback) => {
    Router["get"](path, callback);
  },

  listen: (port, hostname, callback) => {
    let server = http.createServer(router.handle);
    server.listen(port, hostname, callback);
  }
};

module.exports = appObj;
