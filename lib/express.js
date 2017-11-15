const http = require('http');
const url = require('url');

class app {
	constructor() {
		this.routes = {};
		this.routes['get'] = {};
		this.varCheck = false;
		this.pRms = {};
		this.boolArr = [];
		this.varArr = [];
		this.handle = (req, res) => {
			let method = req.method.toLowerCase();
			let path = url.parse(req.url).pathname;
			if (this.varReg) {
				var pathArr = path.split('/');
				var count = 0;
				for (let i = 0; i < Object.keys(this.pRms).length; i++) {
				req.params[Object.keys(this.pRms)[i]] = this.pRms[Object.keys(this.pRms)[i]];
				pathArr[this.pRms[Object.keys(this.pRms)[i]]] = Object.keys(this.pRms)[i];
				}
				path = pathArr.join('/');
			}

			if (this.routes[method][path]) {
				this.routes[method][path](req, res);

			} else {
				console.log(this.pRms);
				res.statusCode = 404;
				res.end('404 Not Found');
			}
		}

		this.get = (path, callback) => {
			let varReg = new RegExp(':', 'i');
			if(varReg.test(path)){
				let pathArr = path.split('/');
				varReg = new RegExp('^:', 'i');
				this.varCheck = true;
				for (let i = 0; i < pathArr.length; i++) {
					if (varReg.test(pathArr[i])) {

					pathArr[i] = pathArr[i].substring(1,);
					this.pRms[pathArr[i]] = i;
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
