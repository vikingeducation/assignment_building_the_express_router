const http = require("http");
var router = require("./lib/router");
// var routes = require('./routes');

var express = {};

// var server = http.createServer(router.handle);
var server = http.createServer(router.handle);

function listen(port, host, callback) {
  server.listen(port, host, callback);
}

function get(path, callback) {
  router.routes.get[path] = callback;
  console.log(router.routes);
}

module.exports = { get, listen };
