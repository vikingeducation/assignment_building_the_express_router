var http = require("http");
var Router = require("./router");

var appObj = {
  get: (path, callback) => {
    //console.log("path in express is " + path);
    //path here is /foo/:bar
    Router.get(path, callback);
  },

  listen: (port, hostname, callback) => {
    let server = http.createServer(Router.handle);
    server.listen(port, hostname, callback);
  },
  post: (path, callback) => {
    Router.post(path, callback);
  }
};

module.exports = appObj;
