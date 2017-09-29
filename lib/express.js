const http = require('http');
const router = require('./router');

let express = () => {

  let app = {
    listen: function(port, host, callback) {
      let server = http.createServer(router.handle);
      server.listen(port, host, callback);
    },

    get: (path, callback) => {
      router.updates(path, callback, "get");
    }
  };

  return app;
};

module.exports = express;