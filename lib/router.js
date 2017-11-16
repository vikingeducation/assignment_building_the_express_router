var url = require("url");
var matchURLToPath = require("./pathmatcher");
var parseParams = require("./parseParams");

var Router = {};

Router.methods = ["get", "post"];

Router.routes = {};

Router.methods.forEach(method => {
  Router.routes[method] = Router.routes[method] || {};
  //router.routes['get'] is now an object
  //below creates router.get = ('/', (req, res) => { })
  Router[method] = (path, callback) => {
    console.log("router method is " + method);
    Router.routes[method][path] = callback;
    //path here should still be /foo/:bar
  };
});

Router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let purl = url.parse(req.url).pathname;
  console.log("method is " + method);
  var callbackPath = purl; //=> later replace purl with callbackPath
  let patharray = Object.keys(Router.routes[method]);
  //["/", "/foo/:bar"]

  patharray.forEach(path => {
    console.log("path is " + path);
    if (matchURLToPath(purl, path)) {
      callbackPath = path;
    }
  });

  //console.log('purl: ' + purl + ' and callbackPath: ' + callbackPath);
  if (Router.routes[method][callbackPath]) {
    //req.params[:bar] = JohnDoe;
    let params = parseParams(callbackPath, purl);
    req.params = params;
    Router.routes[method][callbackPath](req, res);
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
};

module.exports = Router;
