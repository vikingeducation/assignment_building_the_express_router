const http = require("http");
const router = require("./router.js");
const url = require("url");

module.exports = function() {
  return {
    listen: (port, callback) => {
      const server = http.createServer(router.handle);
      let hostname = "localhost";
      server.listen(port, hostname, callback);
    },

    get: (path, callback) => {
      router.routes(path, callback);
    }
  };
};
