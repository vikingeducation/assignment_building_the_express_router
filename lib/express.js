var http = require("http");
var Router = require("./router");

var appObj = {
  get: (path, callback) => {
    Router.get(path, callback)
  },

  listen: (port, hostname, callback) => {
    let server = http.createServer(Router.handle);
    server.listen(port, hostname, callback);
  }
};

module.exports = appObj;
