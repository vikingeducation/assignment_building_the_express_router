var router = require('./lib/router');

var http = require('http');

var port = process.env.PORT || process.argv[2] || 3000;

var host = 'localhost';

//Create server
var app = http.createServer(router.handle);

//listener
app.listen(port, host, () => {
	console.log(`Server listening at port ${port} and host ${host}`);
});
