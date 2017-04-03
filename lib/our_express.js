const http = require('http');
const router = require('./router.js');
const urlRegex = require('./urlRegex');


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
  let pathInfo = urlRegex.parsePath(path);
  let pattern = pathInfo.pattern;
  let paramNames = pathInfo.paramNames;

	router.routes[method][pattern] = {
	  callback: callback,
		paramNames: paramNames
	}
}

