const http = require('http');
const router = require('./router');

function express() {
  // const hostname = '127.0.0.1';
  // const port = 3000;
  var app = {
    listen: function(port, host) {
      const server = http.createServer(router.handle)
      return server.listen(port, host);
    }
  };

  router.methods.forEach( (met) => {
    app[met] = (pattern, callback) => {
      router[met](pattern, callback);
    }
  })



  return app;
}


module.exports = express;
