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

let addRoute = (path, callback, method) => {
  formattedUrlObj = urlRegex.formatUrl(path);
  patternedPath = formattedUrlObj.pattern;
  paramNames = formattedUrlObj.paramNames;

	router.routes[method][patternedPath] = {
	  callback: callback,
		paramNames: paramNames
	}
}

