var url = require('url');
var parser = require('./parser');

var Router = {};

Router.methods = [
  'get',
  'post',
  'put',
  'patch',
  'delete'
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
  var regexp, matchingPattern;
  var method = req.method.toLowerCase();
  var path = url.parse(req.url).pathname;

  for (pattern in Router.routes[method]) {
    regexp = new RegExp(parser.convertToRegExp(pattern));
    if (regexp.exec(path)) {
      matchingPattern = pattern;
      break;
    }
  }

  if (matchingPattern) {
    if (method === 'get') {
      req.params = (parser.getParameters(path, pattern, new RegExp(parser.convertToRegExp(pattern))));
    } else if (method === 'post') {
      var body = '';
      req.on('data', (data) => {
        body += data;
      });
      req.on('end', () => {
        req.body = body;
        console.log(req.body);
      });
    } 
    Router.routes[method][matchingPattern](req, res);
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

module.exports = Router;
