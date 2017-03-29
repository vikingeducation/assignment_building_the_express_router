const http = require('http');
var router = require('./lib/router');
// var routes = require('./routes');

var express = {}

var port = 3000;
var host = 'localhost';

// var server = http.createServer(router.handle);
var server = http.createServer(router.handle);


server.listen(port, host, () => {
	console.log("Listening to Server");
});

function get(path, callback) {
	router.routes.get[path] = callback;
	console.log(router.routes);
};

module.exports = { get };