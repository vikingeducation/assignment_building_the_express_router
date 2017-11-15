"use strict";
const url = require("url");
const express = require("express");

let Router = {}

Router.handle = (req, res) => {
  let method = req.method.toLowerCase();
<<<<<<< HEAD
  let url = url.parse(req.url);
  if (req.method.toLowerCase() === 'get') {
    app.get;
  }
};


    Router.routes[method][path](req, res);
  };

  Router.initializeApp = app => {
    Router.methods = ["get", "post", "put"];
    Router.methods.forEach(method => {
      Router.routes[method] = Router.routes[method] || {};
      app[method] = (path, callback) => {
        Router.routes[method][path] = callback;
      };
    });
  };

  Router.routes = {};
  console.log(Router.routes);
};

// let body = "";
// req.on("data", data => {
//   console.log("DATA : " + data);
//   body += data;
// });
// req.body = body;

module.exports = Router;
