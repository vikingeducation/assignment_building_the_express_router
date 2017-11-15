var url = require('url');
var Router = {};
const http = require('http')

Router.routes = {};
Router.routes['get'] = {};
Router.routes['get']['/'] = (req, res) => {
	res.end('GET /');
};
//Router.listen()


var port = process.env.PORT || process.argv[2] || 3000;
var host = 'localhost';

var server = http.createServer(Router.handle);

server.listen(port, host, () => {
	console.log("Hello World!");
	})




Router.handle = (req, res) => {
	var method = req.method.toLowerCase();
	var path = url.parse(req.url).pathname;

	if (Router.routes[method][path]){
		Router.routes[method][path]( req, res );
	}else{
		res.statusCode = 404;
		res.end('404 Not Found');
	}
}
module.exports = Router;