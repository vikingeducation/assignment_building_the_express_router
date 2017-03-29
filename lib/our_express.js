const http = require('http');

function express(){
	let app = http.createServer(router.handle);

	

	app.get = function (path, callback){
		router.routes.get[path] = callback;
	}


	return app;
}



module.exports = express;