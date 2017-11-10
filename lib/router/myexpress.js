const http = require('http');
const router = require('./router');

function express() {
  // const hostname = '127.0.0.1';
  // const port = 3000;
  var App = {
    listen: function(port, host) {
      const server = http.createServer(router.handle)

      return server.listen(port, host);
    },
    get: function(pattern, callback) {
      return router.get(pattern, callback);
    }
  };


  return App;
}


module.exports = express;
