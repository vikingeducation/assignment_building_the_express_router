let http = require("http");
let router = require("./lib/router.js");
let routes = require("./lib/routes.js");

var app = {
  listen: function(port, host, callback) {
    let server = http.createServer(router.handle);
    console.log("is this working");
    server.listen(port, host, callback);
  },
  get: function(path, callback) {}
};

let express = () => {
  return app;
};

module.exports = express;
