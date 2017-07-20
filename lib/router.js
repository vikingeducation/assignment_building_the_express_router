let url = require("url");
let parser = require("./alt_parser.js");

const Router = {};

Router.routes = {
  get: {},
  post: {}
};

Router.updates = function(path, callback, method) {
  // sets the Router.routes object
  Router.routes[method][path] = callback;
};

Router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = url.parse(req.url).pathname;
  // returns the matches object from the parser. that object will validate that the route is correct and pass back a params object if route was parameterized.
  let matches = parser(Router.routes, path, method);
  if (Router.routes[method] && matches.isTrue) {
    req.params = matches.params;
    Router.routes[method][matches.method](req, res);
  } else {
    res.end("404 Not Found");
  }
};
module.exports = Router;
