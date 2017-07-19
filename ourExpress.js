var http = require("http");

function ourExpress() {
  let self = this;

  self.routes = {};

  return {
		get: function(path, callback) {
			  self.routes['get'] = self.routes['get'] || {};
			 	self.routes['get'][path] = callback;
			 	console.log(self.routes);
	   },

	  listen: function(port, hostname, callback) {
	  	http.createServer((req, res) => {
	  		res.statusCode = 200;
	  		res.setHeader('Content-Type', 'text/plain');
  			res.end('Hello World\n');
	  	});

	  	callback();
	  }
   }
}

module.exports = ourExpress









