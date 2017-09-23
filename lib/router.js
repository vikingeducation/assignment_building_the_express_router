const url = require('url');
const pathParser = require('./path_parser');

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

var Router = {};

Router.methods = [
  'get',
  'post'
];

Router.routes = {};

Router.methods.forEach((method) => {
  Router.routes[method] = Router.routes[method] || {};

  Router[method] = (path, callback) => {
    Router.routes[method][path] = callback;
  };
});

Router.handle = (req, res) => {
  var method = req.method.toLowerCase();
  var path = url.parse(req.url).pathname;

  var parsed = pathParser.parse(method, path, Router);
  req.params = parsed[1];

  if (Router.routes[method][parsed[0]]) {
    var p = new Promise((resolve) =>{
      if (method !== 'get') {
        _extractPostData(req, resolve);
      } else {
        resolve();
      }
    });

    p.then(() => {
      debugger;
      Router.routes[method][parsed[0]](req, res);
    });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

module.exports = Router;
