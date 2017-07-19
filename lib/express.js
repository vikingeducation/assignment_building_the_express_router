'use strict';

const http = require("http");
const router = require('./routing/router');

const express = function() {
  let app = {};

  // Method to forward callbacks to router
  // router.methods.foreach(el => {
  //   app[el] = (path, callback) => {
  //
  //   }
  // })
  app.get = (path, callback) => {
    router.get(path, callback);
  }

  app.post = (path, callback) => {
    router.post(path, callback);
  }

	 app.put = (path, callback) => {

	 }

  app.listen = (port, callback) => {
    http.createServer(router.handle).listen(port, callback);
  }


  return app;
}

module.exports = express;
