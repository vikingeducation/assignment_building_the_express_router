var http = require("http");
let Router = require("./router");

function ourExpress() {
  return {
    get: function(path, callback) {
      Router.routes["get"] = Router.routes["get"] || {};
      Router.routes["get"][path] = callback;
      //  console.log(Router.routes["get"][path] + "in express");
    },

    listen: function(port, hostname, callback) {
      let server = http.createServer(Router.handle);

      server.listen(port, hostname, callback);
    }
  };
}

module.exports = ourExpress;
