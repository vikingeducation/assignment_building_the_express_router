const url = require('url');

const Router = {};

Router.methods = [
  'get',
  'post'
];

Router.routes = {};

Router.methods.forEach((method) => {
  Router.routes[method] = {};
  Router[method] = (path, callback) => {
    Router.routes[method][path] = callback;
  };
});

Router.handle = (req, res) => {
  const method = req.method.toLowerCase();
  const path = url.parse(req.url).pathname;

  if (Router.routes[method][path]) {
    const p = new Promise((resolve) => {
      if (method !== 'get') {
        _extractPostData(req, resolve);
      } else {
        resolve();
      }
    });

    p.then(() => {
      Router.routes[method][path](req, res);
    });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

module.exports = Router;
