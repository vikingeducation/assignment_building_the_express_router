const http = require('http');
const url = require('url');

class app {
	constructor() {
		this.routes = {};
		this.routes['get'] = {};
		this.varCheck = false;
		this.boolArr = [];
		this.varArr = [];
		this.handle = (req, res) => {
			let method = req.method.toLowerCase();
			let path = url.parse(req.url).pathname;
			if (this.varReg) {
				var pathArr = path.split('/');
				var count = 0;
				for (let i = 0; i < this.boolArr.length; i++) {
					if (this.boolArr[i]) {
						req.params[this.varArr[count]] = pathArr[i];
						pathArr[i] = this.varArr[count];
						count++;
					}
				}
			}
			path = path.join('/');

			if (this.routes[method][path]) {
				this.routes[method][path](req, res);


			} else {
				res.statusCode = 404;
				res.end('404 Not Found');
			}
		}

		this.get = (path, callback) => {
			let varReg = new RegExp('^:', 'i');
			if(varReg.test(path)){
				let pathArr = path.split('/');
				this.boolArr = pathArr.map(x => {
						if (varReg.test(x)) {
						varArr[varArr.length] = x.substring(1,);
						}
						return varReg.test(x);
						});
				this.varCheck = true;
				for (let i = 0; i < this.boolArr.length; i++) {
					if (this.boolArr[i]) {
						pathArr[i] = pathArr[i].substring(1,);
					}
				}
				path = pathArr.join('/');
			}
			this.routes['get'][path] = callback;
		};

		this.listen = (...args) => {
			let server = http.createServer(this.handle);
			server.listen(...args);
		}
	}
	;
}


express = function() {
	return new app()
}


module.exports = express;
