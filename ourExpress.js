var http = require("http");
let Router = require("./Router");

function ourExpress() {
	
  return {
		get: function(path, callback) {
			  Router.routes['get'] = Router.routes['get'] || {};
			 	Router.routes['get'][path] = callback;
			 	console.log(Router.routes);
	   },

	  listen: function(port, hostname, callback) {
	  	let server = http.createServer((req, res) => {
	  		console.log('hi')
	  		res.statusCode = 200;
	  		res.setHeader('Content-Type', 'text/plain');
  			res.end('Hello World\n');
	  	});

	  	server.listen(port, hostname, callback);
	  }
   }
}

module.exports = ourExpress;









