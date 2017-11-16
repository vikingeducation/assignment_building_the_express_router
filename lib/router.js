// ROUTER

let http = require('http');
let url = require('url');

var Router = {};

// Supported routes
Router.methods = [
  'get',
  'post'
];

// Object to hold registered routes
Router.routes = {};

Router.handle = (req, res) => {
  const method = req.method.toLowerCase();
  const path = url.parse(req.url).pathname;
  console.log("--------------- ROUTER object ---------- ")
  console.log(Router);
  Router.routes[method][path](req, res);
}

Router.initializeApp = app => {
  Router.methods.forEach((method) => {

  // Initialize the key in routes if
  // if doesn't exist yet
    Router.routes[method] = Router.routes[method]|| {};

  // Add the callback to the method using
  // the path as the key to the callback
    app[method] = (path, callback) => {
      Router.routes[method][path] = callback;
    };
  });
};

module.exports = Router;
