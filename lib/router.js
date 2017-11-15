var url = require("url");

var Router = {};

Router.methods = ["get", "post"];

Router.routes = {};

Router.methods.forEach(method => {
  Router.routes[method] = Router.routes[method] || {};
  //router.routes['get'] is now an object
  //below creates router.get = ('/', (req, res) => { })
  Router[method] = (path, callback) => {
  Router.routes[method][path] = callback;
  //path here should still be /foo/:bar
  };
});

var matchURLToPath = (url, path) => {
  //url = /foo/johndoe
  //path = /foo/:bar
  //make pattern based on path

  let paramspatharray = path.split("/").slice(1); //["foo", ":bar"]
  let paramsurlarray = url.split("/").slice(1); //["foo", "johndoe"]

  let index = 0;
  while (index < paramspatharray.length - 1) {
  if (
  paramspatharray[index] != paramsurlarray[index] ||
  paramspatharray[index].charAt(0) != ":"
  ) {
  return false;
  }
  index += 1;
  }
  return true;
};

Router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let purl = url.parse(req.url).pathname;
  let patharray = Object.keys(Router.routes[method]);

  patharray.forEach(path => {
  // /foo/:bar

  if (matchURLToPath(purl, path)) {
  console.log("returned true");
  console.log("purl was " + purl + ", path was " + path);

  purl = path;
  }
  });

  if (Router.routes[method][purl]) {
  Router.routes[method][purl](req, res);
  } else {
  res.statusCode = 404;
  res.end("404 Not Found");
  }
};

module.exports = Router;
