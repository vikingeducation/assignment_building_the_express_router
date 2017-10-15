'use strict';

let url = require('url');
let parser = require('./parser');

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

let Router = {
  methods: ['get', 'post'],
  routes: {} 
};

Router.methods.forEach((method) => {

  // Produces this: 
  // Router.routes.get = {};
  Router.routes[method] = {};

  // Produces this:
  // Router.get = (path, callback) => {
  //	...
  // };
  Router[method] = (path, callback) => {
    let pathRegex = parser.parse(path);
    Router.routes[method][pathRegex.pattern] = {
    	callback: callback,
		  paramNames: pathRegex.params // eg, [ 'bar', 'baz' ]
  	};
  };
});

// The handler: handle all incoming HTTP requests here
Router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = url.parse(req.url).pathname;

 	// if (Router.routes[method][path]) {
  let pathMatch = parser.match(Router.routes[method], path);

  let pattern = pathMatch.pattern;
  let names = pathMatch.names;
  let values = pathMatch.values;

  if (pattern) {
    req.params = {};
    for (let i = 0; i<names.length; i++) {
      req.params[names[i]] = values[i];
    }   
    let p = new Promise( resolve => {
      if (method !== 'get') {
        _extractPostData(req, resolve);
      } else {
        resolve();
      }
    });

    // Respond with the correct handler for the HTTP method and path
    p.then( () => {

      // Router.routes[method][path](req, res);
      Router.routes[method][pattern].callback(req,res);
    });
  } else {
    res.statusCode = 404;
    res.end('DC: 404 Not Found');
  }
};

module.exports = Router;
