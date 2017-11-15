"use strict";
const http = require("http");
const router = require("./router.js");

let express = () => {
  let app = (req, res) => {
    router(req, res);
  };

  console.log("ROUTER : " + app);
  // router.initializeApp(app);

  app.listen = (path, host, callback) => {
    const server = http.createServer(app);
    return server.listen(path, host, callback);
  };

  return app;
};

module.exports = express;
