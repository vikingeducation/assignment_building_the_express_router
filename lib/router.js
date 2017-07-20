let url = require("url");
let parser = require("./alt_parser.js");

const Router = {};

Router.routes = {
  get: {}
};

Router.updates = function(path, callback, method) {
  Router.routes[method][path] = callback;
};

Router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = url.parse(req.url).pathname;
  let matches = parser(Router.routes, path);
  if (Router.routes[method] && matches.isTrue) {
    Router.routes[method][matches.method](req, res);
  } else {
    res.end("404 Not Found");
  }
};
module.exports = Router;
