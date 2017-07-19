let url = require("url");

const Router = {};


Router.routes = {
//  get: {
//    "/": (req, res) => {
//      console.log("working!");
//      console.log(req);
//      console.log(res);
 //     res.end("Hello Vikings!")

//    }
//  }
};

Router.updates = function (path, callback, method) {
 Router.routes[method][path] = callback
}

Router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = url.parse(req.url).pathname;
  Router.routes[method][path](req, res);
};
module.exports = Router;
