let http = require('http');


var Router = {};

// Supported routes
Router.methods = [
  'get',
  'post'
];

// Object to hold registered routes
Router.routes = {};

Router.handle = (req, res) => {
    res.status = 200;
    res.setHeader("Content-Type", "text/plain");
    //res.end("server up");
};

// For each supported HTTP method
// create a function that registers
// a callback for that method and a given path
Router.methods.forEach((method) => {

  // Initialize the key in routes if
  // if doesn't exist yet
  Router.routes[method] = Router.routes[method] || {};

  // Add the callback to the method using
  // the path as the key to the callback
  Router[method] = (path, callback) => {
    Router.routes[method][path] = callback;
  };
});


module.exports = Router;