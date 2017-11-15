// ROUTER

let http = require('http');
let url = require('url');

var Router = {};

// Supported routes
Router.methods = [
  'get',
  'post'
];

/*Router.routes = {
  get: {
    '/': (req, res) => {
      res.end('Hello!');
    }
  }
};*/

// Object to hold registered routes
Router.routes = {};

Router.handle = (req, res) => {
  const method = req.method.toLowerCase();
  const path = url.parse(req.url).pathname;
  console.log("--------- url ---------");
  console.log(path);
  Router.routes[method][path](req, res);
}

/*Router.handle = (req, res) => {
    res.status = 200;
    res.setHeader("Content-Type", "text/plain");
    console.log(Router);
    res.end("server up");
};*/


Router.initializeApp = app => {
  Router.methods.forEach((method) => {

  // Initialize the key in routes if
  // if doesn't exist yet
    Router.routes[method] = Router.routes[method]|| {};

  // Add the callback to the method using
  // the path as the key to the callback
    app[method] = (path, callback) => {
      // console.log("callback for router: " + callback);
      Router.routes[method][path] = callback;
    };
  });
};

module.exports = Router;
