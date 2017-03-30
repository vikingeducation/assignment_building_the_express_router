const http = require('http');
const router = require('./router.js');
const urlRegex = require('./urlRegex')


function express(){
  let app = http.createServer(router.handle);

  app.get = function (path, callback){
    addRoute(path, callback, 'get');
  }

  app.post = function (path, callback){
    addRoute(path, callback, 'post');
  }

  return app;
}



module.exports = express;

function addRoute(path, callback, method) {
  let formattedUrlObj = urlRegex.formatUrl(path);
  let patternedPath = formattedUrlObj.pattern;
  let paramNames = formattedUrlObj.paramNames;

	router.routes[method][patternedPath] = {
	  callback: callback,
		paramNames: paramNames
	}
}

