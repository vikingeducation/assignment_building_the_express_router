const http = require("http");

module.exports = function() {
	return {
		listen: (port, callback) => {
			const server = http.createServer((req, res) => {
				res.statusCode = 200;
			  res.setHeader('Content-Type', 'text/plain');
			  res.end('Hello World\n');
			});

			let hostname = "localhost";

			server.listen(port, hostname, callback);
		},

		get: () => {}
	};
};