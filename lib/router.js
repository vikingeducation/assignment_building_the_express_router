let url = require("url");

const Router = {};

Router.routes = {
  get: {
    "/": (req, res) => {
      console.log("working!");
      console.log(req);
      console.log(res);
    }
  }
};

Router.handle = (req, res) => {
  console.log(req);
  console.log(req.method);
  // var p = new Promise(resolve => {
  let method = req.method.toLowerCase();
  let path = url.parse(req.url).pathname;

  resolve(Router.routes[method][path](req, res));
  // });
  // p.then();
};
module.exports = Router;
