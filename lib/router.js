"use strict";
const url = require("url");
const express = require("./express");

const Router = {};

Router.routes = {};

Router.parser = (req, res) => {
  let string = url.parse(req.url).pathname.split(`:`, 3);
  console.log(string);
};

Router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = url.parse(req.url).pathname;
  if (Router.routes[method][path]) {
    Router.routes[method][path](req, res);
  } else {
    console.log(url.parse(req.url));
    Router.parser(req, res);
  }
};

Router.initializeApp = app => {
  Router.methods = ["get", "post", "put"];
  Router.methods.forEach(method => {
    Router.routes[method] = Router.routes[method] || {};
    app[method] = (path, callback) => {
      Router.routes[method][path] = callback;
    };
  });
  router[method] = (path, callback) => {
    Router.parser(path);
  };
};

// Router.initializeApp = app => {
//   Router.methods.forEach(method => {
//     // Initialize the key in routes if
//     // if doesn't exist yet
//     Router.routes[method] = Router.routes[method] || {};
//
//     // Add the callback to the method using
//     // the path as the key to the callback
//     app[method] = (path, callback) => {
//       Router.routes[method][path] = callback;
//     };
//   });
// };
// let body = "";
// req.on("data", data => {
//   console.log("DATA : " + data);
//   body += data;
// });
// req.body = body;

module.exports = Router;
