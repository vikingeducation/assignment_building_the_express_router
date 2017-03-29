const http = require('http');
const router = require('./router.js');
const urlRegex = require('./urlRegex')

function express(){
	let app = http.createServer(router.handle);

	

	app.get = function (path, callback){
    formattedUrlObj = urlRegex.formatUrl(path);
    patternedPath = formattedUrlObj.pattern;
    paramNames = formattedUrlObj.paramNames;

		router.routes.get[patternedPath] = {
			callback: callback,
			paramNames: paramNames
		}
	}

	app.post = function (path, callback){
		router.routes.post[path] = callback;
	}


	return app;
}



module.exports = express;

