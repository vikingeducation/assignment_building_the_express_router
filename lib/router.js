let url = require("url");

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
  Router.routes[method][path](req, res);
};
module.exports = Router;
