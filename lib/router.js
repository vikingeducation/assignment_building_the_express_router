const url = require("url");
//router
const Router = {};

Router.routes = {};
Router.routes["get"] = {};
Router.routes["get"]["/"] = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.send("Hello World, got a get req");
};

Router.handle = (req, res) => {
  var method = req.method.toLowerCase();
  var path = url.parse(req.url).pathname;

  Router.routes;
  if (Router.routes[method][path] === null) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("You can no haz webpage\n");
  } else {
    Router.routes[method][path](req, res);
  }
};

module.exports = Router;
