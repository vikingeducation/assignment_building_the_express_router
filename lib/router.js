var url = require('url');

var Router = {};

Router.routes = {};

Router.routes['get'] = {};

Router.methods = ['get', 'post'];

Router.routes['get']['/'] = (req, res) => {
	res.end('GET /');
};

// Router.methods.forEach(method => {
// 	// Initialize the key in routes if
// 	// if doesn't exist yet
// 	Router.routes[method] = Router.routes[method] || {};
//
// 	// Add the callback to the method using
// 	// the path as the key to the callback
// 	Router[method] = (path, callback) => {
// 		Router.routes[method][path] = callback;
// 	};
// });
//
Router.handle = (req, res) => {
	var method = req.method.toLowerCase();
	var path = url.parse(req.url).pathname;

	if (Router.routes[method][path]) {
		Router.routes[method][path](req, res);
	} else {
		res.statusCode = 404;
		res.end('File Not Found');
	}
};

module.exports = Router;

//Router
// {'get': {'/': callback(), '/foo': callback_foo(), '/foo/:users': callback()},
// 'post': {}}
