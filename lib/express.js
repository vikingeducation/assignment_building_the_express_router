'use strict';

const http = require('http');
const router = require('./router');

let express = () => {
	let app = {
		get: (path, callback) => {
			router.get(path,callback);
		},

		post: (path, callback) => {
			router.post(path,callback);
		},

		listen: (port, host, callback) => {
			let server = http.createServer(router.handle);

			/*
			//respond to all requests without regard to verb and path
			let server = http.createServer( (req,res) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'text/plain');
				res.end('Hello World!\n');
			});
			*/

			server.listen(port, host, callback);
		}	
	};
	return app;
};
module.exports = express;
