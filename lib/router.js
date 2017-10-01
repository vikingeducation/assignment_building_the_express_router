const url = require('url');
const parser = require('./parser');

// Private method to extract POST
// data from a request
// Calls done() to resolve the wrapping
// promise when finished
let _extractPostData = (req, done) => {
  let body = '';
  req.on('data', (data) => {
    body += data;
  });
  req.on('end', () => {
    req.body = body;
    done();
  });
};

// Building the Router
let Router = {};

// Supported routes
Router.methods = [
  'get',
  'post'
];

// Object to hold registered routes
Router.routes = {};

/// For each supported HTTP method
// create a function that registers
// a callback for that method and a given path
Router.methods.forEach((method) => {

  // Initialize the key in routes
  // Produces this:
  // Router.routes.get = {};
  // Router.routes.post = {};
  Router.routes[method] = {};

  // Add the callback to the method using
  // the path as the key to the callback
  // Produces this:
  // Router.get = (path, callback) => {
  //   Router.routes.get[path] = callback;
  // };
  // Router.post = (path, callback) => {
  //   Router.routes.post[path] = callback;
  // };
  Router[method] = (path, callback) => {

    // Produces this:
    // Router.routes.get[path] = callback;
    // Router.routes.post[path] = callback;

    //parse Path here
    let pathRegex = parser.parsePath(path);

    Router.routes[method][pathRegex.pattern] = {
    	callback: callback,
		paramNames: pathRegex.params
	}
  };
});

// Handles all incoming HTTP requests
Router.handle = (req, res) => {

  // Get the request's HTTP method	
  let method = req.method.toLowerCase();

  // Get the URL path of the request
  let path = url.parse(req.url).pathname;

  // Route matching would happen here
  let pathMatch = parser.matchPath(Router.routes[method], path);

  let pattern = pathMatch.pattern;
  let names = pathMatch.names;
  let values = pathMatch.values;


  if (pattern) {
    req.params = {};
    for (let i = 0; i<names.length; i++) {
      req.params[names[i]] = values[i];
    } 


    // Use a promise to always resolve
    // but allow async post data extraction
    let p = new Promise((resolve) => {
      if (method !== 'get') {
        _extractPostData(req, resolve);
      } else {
        resolve();
      }
    });

    // Respond with the correct handler
    // for the HTTP method and path
    p.then(function() {

     //parsed pathn here	
      Router.routes[method][pattern].callback(req, res);
    });
  } else {

    // If the handler is not found
    // respond with a 404
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

module.exports = Router;