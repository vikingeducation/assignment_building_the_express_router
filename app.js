var http = require('http');
var router = require('./lib/router');
require('./routes');

var port = process.env.PORT || process.argv[2] || 3000;
var host = 'localhost';

// Delegate the server callback to the router
var server = http.createServer(router.handle);

server.listen(port, host, () => {
	console.log(`Listening: http://${host}:${port}`);
});
