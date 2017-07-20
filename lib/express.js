'use strict';

const http = require("http");
const router = require('./routing/router');

const express = function() {
  let app = {};
  
  // Method to forward callbacks to router
  router.methods.forEach(el => {
    app[el] = (path, callback) => {
      router[el](path, callback);
    }
  });

  app.listen = (port, callback) => {
    http.createServer(router.handle).listen(port, callback);
  }


  return app;
}

module.exports = express;
