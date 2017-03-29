const http = require('http');
const router = require('./router.js');

function express(){
	let app = http.createServer(router.handle);

	

	app.get = function (path, callback){
		router.routes.get[path] = callback;
	}


	return app;
}



module.exports = express;



function routePattern(path) {
	let match = path.match(/(.+):\w+$/);
	// We want to return the matched part
}