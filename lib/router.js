let url = require("url");

const Router = {};

Router.routes = {
  get: {
    "/": (req, res) => {
      console.log("got root directory");
    }
  }
};

Router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = url.parse(req.url).pathname;

  Router.routes[path][method](req, res);
};
