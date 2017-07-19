let http = require("http");
let router = require("./router.js");
let routes = require("./routes.js");

let express = () => {
  var app = {
    listen: function(port, host, callback) {
      let server = http.createServer(router.handle);
      console.log("is this working");
      server.listen(port, host, callback);
    },
    get: Router.updates(path, callback)
  };
  return app;
};

module.exports = express;
