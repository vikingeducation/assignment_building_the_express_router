let url = require("url");
let parser = require("./Parser");

let Router = {};
Router.routes = {};

Router.handle = function(req, res) {
  var method = req.method.toLowerCase();
  var path = parser.CheckURL(url.parse(req.url).pathname);

  console.log(method, "method");
  console.log(path, "path");

  // req.params

  var keys = Object.keys(Router.routes.get);
  console.log(keys);

  keys.forEach(item => {
    parser.parsePattern(item, path);
  });
  // Router.routes.get
  // path = parser.CheckURL(path);

  if (Router.routes[method][path]) {
    Router.routes[method][path](req, res);
  } else {
    // console.log(req.url, 'what is');
    res.statusCode = 404;
    res.end("404");
  }
};

module.exports = Router;
