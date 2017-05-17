const url = require('url');

let Router = {};

const _extractPostData = (req, done) => {
  var body = '';
  req.on('data', (data) => {
    body += data;
  });
  req.on('end', () => {
    req.body = body;
    done();
  });
};

Router.methods = [
  'get',
  'post'
];

Router.routes = {};

// app is a reference to an instance of Express class
// this creates methods named after http verbs on that class instance
Router.createHandlers = (app) => {
  Router.methods.forEach((method) => {
    Router.routes[method] = {};

    app[method] = (path, callback) => {
      Router.routes[method][path] = callback;
    };
  });
};

Router.handle = (req, res) => {
  const method = req.method.toLowerCase();
  const path = url.parse(req.url).pathname;

  if (Router.routes[method][path]) {

    var p = new Promise((resolve) => {
      if (method !== 'get') {
        _extractPostData(req, resolve);
      } else {
        resolve();
      }
    });

    p.then(function() {
      Router.routes[method][path](req, res);
    });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

module.exports = Router;