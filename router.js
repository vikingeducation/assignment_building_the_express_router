let url = require("url");
let parser = require("./Parser");

let Router = {};
Router.routes = {};

Router.handle = function(req, res) {
  var method = req.method.toLowerCase();
  var path = url.parse(req.url).pathname;


  console.log(method, "method");
  console.log(path, "path");
  console.log(Router.routes['get'][path])

  var keys = Object.keys(Router.routes.get);

  let obj = {};

  keys.forEach(item => {
    obj = Object.assign({}, parser.parsePattern(item, path));
  });

  req.params = obj;

  // current url
  console.log(req.url);

  // registered url
  console.log(Router.routes[method])

  if (Router.routes[method][path]) {
    Router.routes[method][path](req, res);

  } else {
    // console.log(req.url, 'what is');
    res.statusCode = 404;
    res.end("404");
  }
};

module.exports = Router;
