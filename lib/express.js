const http = require('http');
const router = require('./router');
const parser = require('./parser');

function _addRoute(method, path, callback) {
  const pathInfo = parser.parsePath(path);
  const { pattern, paramKeys } = pathInfo;
  router.routes[method][pattern] = {
    callback,
    paramKeys
  };
}

function express() {
  const app = {
    listen(port, callback) {
      const server = http.createServer(router.handle);
      server.listen(port, () => {
        callback();
      });
    },
    get(path, callback) {
      _addRoute('get', path, callback);
    }
  };
  return app;
}

module.exports = express;
// server.listen(port, host, () => {
//   callback();
// });

// ,
// get(pathPattern, callback) {
//   const [pathRegex, pathParams] = parser(pathPattern);
//   router.routes.get[pathRegex] = callback;
//   router.params.get[pathRegex] = pathParams;
// }

// const [pathRegex, pathParams] = parser(path);
// router.routes[method][pathRegex] = callback;
// router.params[method][pathRegex] = pathParams;
