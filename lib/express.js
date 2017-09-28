const http = require('http');
const router = require('./router');

function express() {
  const app = {
    listen(port, callback) {
      const server = http.createServer(router.handle);
      server.listen(port, () => {
        callback();
      });
    },
    get(path, callback) {
      router.routes.get[path] = callback;
    }
  };


  return app;
}

module.exports = express;
