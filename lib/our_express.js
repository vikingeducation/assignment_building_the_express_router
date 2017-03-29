const http = require('http');
const router = require('./router.js');
const urlRegex = require('./urlRegex')

function express(){
	let app = http.createServer(router.handle);

	

	app.get = function (path, callback){
    formattedUrlObj = formatUrl(path);
    patternedPath = formattedUrlObj.pattern;
    param_names = formattedUrlObj.param_names;

		router.routes.get[patternedPath] = {
			callback: callback;
			param_names: param_names;
		}
	}


	return app;
}



module.exports = express;

