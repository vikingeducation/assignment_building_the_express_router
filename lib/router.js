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
  console.log(path);
  if (Router.routes[method][path]) {
    Router.routes[method][path](req, res);
    } else {
      res.end("404 Not Found")
    }
};
module.exports = Router;
