var url = require("url");

let Router = {};

Router.routes = {};
Router.handle = function(req, res) {
  var method = req.method.toLowerCase();
  var path = url.parse(req.url).pathname;
  if (Router.routes[method][path]) {
    Router.routes[method][path](req, res);
  } else {
    res.statusCode = 404;
    res.end("404 not found");
  }
};

module.exports = Router;
