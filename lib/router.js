'use strict';
var url = require('url');

var _extractPostData = (req, done) => {
  var body = '';
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
  //   Router.routes.get[path] = callback;
  // };
  Router[method] = (path, callback) => {

    // Produces this:
    // Router.routes.get[path] = callback;
    Router.routes[method][path] = callback;
  };

});

// Handles all incoming HTTP requests
Router.handle = (req, res) => {
  var method = req.method.toLowerCase();
  var path = url.parse(req.url).pathname;

  // Route matching would happen here
  if (Router.routes[method][path]) {
    var p = new Promise((resolve) => {
      if (method !== 'get') {
        _extractPostData(req, resolve);
      } else {
        resolve();
      }
    });

    // Respond with the correct handler for the HTTP method and path
    p.then( () => {
      Router.routes[method][path](req, res);
    });
  } else {
    res.statusCode = 404;
    res.end('DC: 404 Not Found');
  }
};

module.exports = Router;
