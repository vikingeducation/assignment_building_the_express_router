const http = require('http');
const router = require('./router');

let express = () => {

  let app = {
    listen: function(port, host, callback) {
      let server = http.createServer(router.handle);
      server.listen(port, host, callback);
    },

    get: (path, callback) => {
      router.get(path, callback);
    },

    post: (path, callback) => {
      router.post(path, callback);
    },

    put: (path, callback) => {
      router.put(path, callback);
    },

    patch: (path, callback) => {
      router.patch(path, callback);
    },

    delete: (path, callback) => {
      router.delete(path, callback);
    }

  };

  return app;
};

module.exports = express;