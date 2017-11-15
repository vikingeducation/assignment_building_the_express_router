const http = require('http');
var router = require('./lib/index.js');
var app = router();




var port = process.env.PORT || process.argv[2] || 3000;
var host = 'localhost';

var server = http.createServer(router.handle);

server.listen(port, host, () => {
	console.log("Hello World!");
	})