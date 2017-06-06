var url = require('url');
var parser = require('./parser');

var Router = {};

Router.methods = [
  'get',
  'post'
];

Router.routes = {};

Router.methods.forEach( (method) => {
  Router.routes[method] = Router.routes[method] || {};

  // Router[method] = (path, callback) => {
  //   Router.routes[method][parser.convertToRegExp(path)] = callback;
  // };
  Router[method] = (pattern, callback) => {
    Router.routes[method][pattern] = callback;
  };
});

Router.handle = (req, res) => {
  var method = req.method.toLowerCase();

  var path = url.parse(req.url).pathname;

  for (pattern in Router.routes[method]) {
    var regexp = new RegExp(parser.convertToRegExp(pattern), 'g');
    if (regexp.exec(path)) {
      var matchingPattern = pattern;
    }
  }

  if (matchingPattern) {
    req.params = (parser.getParameters(path, pattern, new RegExp(parser.convertToRegExp(pattern))));
    Router.routes[method][matchingPattern](req, res);
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

module.exports = Router;
