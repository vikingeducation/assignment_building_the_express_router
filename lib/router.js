'use strict';
const url = require('url');

const router = (req, res) => {
  let method = req.method.toLowerCase();
  if (req.method.toLowerCase() === 'get') {
    app.get;
  }
};

app.methods = ['get', 'post', 'put'];

app.get = (path, callback) => {
  if (app.get[path]) {
    app.get[path] = app.get[path] || {};
    app[get] = (path, callback) => {
      app[get][path] = callback(req, res);
    };
  }
};

// let body = "";
// req.on("data", data => {
//   console.log("DATA : " + data);
//   body += data;
// });
// req.body = body;
