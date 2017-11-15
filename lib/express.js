const http = require('http');
const url = require('url');

class app {
	constructor(){
		this.routes = {};
		this.routes['get'] = {};
		this.handle = (req, res) => {
			var method = req.method.toLowerCase();
			var path = url.parse(req.url).pathname;

			if (this.routes[method][path]){
				this.routes[method][path]( req, res );
			}else{
				res.statusCode = 404;
				res.end('404 Not Found');
			}
		}

		this.get = (path, callback) =>{
			this.routes['get'][path] = callback;		
		}

			this.listen = (...args) => {

				let server = http.createServer(this.handle);
				server.listen(...args);
			}
	};		
}


express = function(){
	return new app()
}


module.exports = express;