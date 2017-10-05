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
    },
    post(path, callback) {
      _addRoute('post', path, callback);
    },
    put(path, callback) {
      _addRoute('put', path, callback);
    },
    patch(path, callback) {
      _addRoute('patch', path, callback);
    },
    delete(path, callback) {
      _addRoute('delete', path, callback);
    }
  };
  return app;
}

module.exports = express;
