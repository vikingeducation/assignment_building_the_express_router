const http = require('http');
const router = require('./router');
const routes = require('./routes');

function express() {
  // const hostname = '127.0.0.1';
  // const port = 3000;
  var App = {
    listen: function(port, host) {
      const server = http.createServer(router.handle)

      return server.listen(port, host);
    },
    get: function(path, callback) {
      // routes.parser(path);
      return router.get(path, callback);
    }
  };


  return App;
}


module.exports = express;
