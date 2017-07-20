let url = require("url");
let parser = require("../alt_parser.js");

const Router = {};

Router.routes = {
  get: {}
};

Router.updates = function(path, callback, method) {
  Router.routes[method][path] = callback;
  parser.pattern[path] = {};
};

Router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = url.parse(req.url).pathname;
  parser(path);
  if (Router.routes[method][path]) {
    Router.routes[method][path](req, res);
  } else {
    res.end("404 Not Found");
  }
};
module.exports = Router;
