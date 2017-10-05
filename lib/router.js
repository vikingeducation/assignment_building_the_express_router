const url = require('url');
const parser = require('./parser');

const _extractPostData = (req, done) => {
  let body = '';
  req.on('data', (data) => {
    body += data;
  });
  req.on('end', () => {
    req.body = body;
    done();
  });
};

const Router = {};
Router.routes = {};
Router.routes.get = {};
Router.routes.post = {};

Router.handle = (req, res) => {
  const method = req.method.toLowerCase();
  const path = url.parse(req.url).pathname;
  const pathSearch = parser.pathSearch(req, Router, method, path);
  const { pattern, paramKeys, paramValues } = pathSearch;

  if (pattern) {
    req.params = {};
    for (let i = 0; i < paramKeys.length; i++) {
      req.params[paramKeys[i]] = paramValues[i];
    }

    const p = new Promise((resolve) => {
      if (method !== 'get') {
        _extractPostData(req, resolve);
      } else {
        resolve();
      }
    });

    p.then(() => {
      Router.routes[method][pattern].callback(req, res);
    });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

module.exports = Router;
