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
  'post',
  'put',
  'patch',
  'delete'
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

  req.params = parsed.params;

  if (Router.routes[method][parsed.path]) {
    var p = new Promise((resolve) =>{
      if (method !== 'get') {
        _extractPostData(req, resolve);
      } else {
        resolve();
      }
    });

    p.then(() => {
      Router.routes[method][parsed.path](req, res);
    });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

module.exports = Router;
