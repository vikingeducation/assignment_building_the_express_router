var url = require("url");

var Router = {};

Router.methods = ["get", "post"];

Router.routes = {};

Router.methods.forEach(method => {
  Router.routes[method] = Router.routes[method] || {};
  //router.routes['get'] is now an object
  //below creates router.get = ('/', (req, res) => { })
  Router[method] = (path, callback) => {
    Router.routes[method][path] = callback
    //path here should still be /foo/:bar
  };
});

var matchURLToPath = (url, path) => {
  //url = /foo/johndoe
  //path = /foo/:bar
  if path == "/" return true

  paramspatharray = path.split("/") // ["", "foo", ":bar"]
  paramsurlarray = url.split("/") // ["", "foo", "johndoe"]

  paramspatharray = paramspatharray.map((idx, item) => {
    if paramspatharray[idx].charsAt(0) == ":" { return paramsurlarray[idx]}
    return item
  }) // turns ["", "foo", ":bar"] to ["", "foo", "johndoe"]

  if paramspatharray == paramsurlarray return true
}

Router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let purl = url.parse(req.url).pathname;

  console.log('Router.routes[method]', Router.routes[method])
  //resembles Router.routes[get] { '/': [Function], '/foo/:bar': [Function] }

  let patharray = Object.keys(Router.routes[method])

  var callbackPath = purl; //=> later replace purl with callbackPath

  patharray.forEach((path) => {
    // /foo/:bar
    if(matchURLtoPath(purl, path){
      callbackPath = path
    }

    "/" and /foo/johndoe returns true
    "/foo/:bar" and /foo/johndoe returns true

  })

  if (Router.routes[method][purl]) {
    Router.routes[method][purl](req, res);
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
};

module.exports = Router;
