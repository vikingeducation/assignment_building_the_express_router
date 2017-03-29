const http = require('http');
const router = require('./router.js');
const urlRegex = require('./urlRegex')

function express(){
	let app = http.createServer(router.handle);

	

	app.get = function (path, callback){
    path = formatUrl(path);
		router.routes.get[path] = callback;
	}


	return app;
}



module.exports = express;


//What if path is /
function routePattern(path) {
	let match = path.match('/(.+):\w+$/');
	// We want to return the matched part

  // 
}