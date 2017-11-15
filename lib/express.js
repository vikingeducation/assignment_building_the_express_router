"use strict";
const http = require("http");
const router = require("./router.js");

// let body = "";
// req.on("data", data => {
//   console.log("DATA : " + data);
//   body += data;
// });
// req.body = body;

let express = () => {
  let app = (req, res) => {
    console.log(req.url);
    // router(req, res);
  };
  app.methods = ["get", "post", "put"];

  app.get = (path, callback) => {
    if (app.get[path]) {
      app.get[path] = app.get[path] || {};
      app[get] = (path, callback) => {
        app[get][path] = callback(req, res);
      };
    }
  };

  app.listen = (port, hostname, callback) => {
    const server = http.createServer(app);
    server.listen(port, hostname, callback);
  };

  return app;
};

module.exports = express;
