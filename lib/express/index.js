var http = require("http");
var url = require("url");

const verbs = ["get"];
const paramsRegex = /\:([a-zA-Z0-9_-]*)/;

Router = {};

Router.routes = {};

Router.listen = function(port, host, callback) {
  var server = http.createServer(Router.handle);
  server.listen(port, host, callback);
};

verbs.forEach(verb => {
  Router.routes[verb] = Router.routes[verb] || {};

  Router[verb] = (path, callback) => {
    pathParts = path.split(path).slice(1);
    console.log(pathParts);
    let pathRegex = /\//;
    pathParts.forEach(part => {
      if (part !== "" && paramsRegex.test(part)) {
        pathRegex = new RegExp(pathRegex.source + paramsRegex.source + "/");
      } else {
        pathRegex = new RegExp(pathRegex.source + path + "/");
      }
    });
    // [':name']

    Router.routes[verb][pathRegex] = callback;
    console.log(Router.routes);
  };
});

Router.handle = function(req, res) {
  const verb = req.method.toLowerCase();
  const path = url.parse(req.url).pathname;
  var found = false;
  for (let pathRegex in Router.routes[verb]) {
    if (pathRegex.test(path)) {
      found = true;
      Router.routes[verb][pathRegex](req, res);
    }
  }
  if (!found) {
    res.statusCode = 404;
    res.end("404 NOT FOUND, LOSER");
  }
};

module.exports = Router;
