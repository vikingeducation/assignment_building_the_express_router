let http = require('http');

var Router = {};

// Supported routes
Router.methods = [
  'get'//,
  //'post'
];

// Object to hold registered routes
Router.routes = {};

Router.get = (path, callback) => {
              Router.routes.get[path] = callback;
};
