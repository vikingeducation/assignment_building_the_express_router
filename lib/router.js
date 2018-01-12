var url = require("url");
var matchURLToPath = require("./pathmatcher");
var parseParams = require("./parseParams");

var Router = {};

Router.methods = ["get", "post"];

Router.routes = {};

Router.methods.forEach(method => {
  Router.routes[method] = Router.routes[method] || {};
  Router[method] = (path, callback) => {
    Router.routes[method][path] = callback;
  };
});

Router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let purl = url.parse(req.url).pathname;
  
  let body = ''
  req.on('data', (data) => {
    console.log('heres the data in req.on: ' + data);
    body += data
  })
  req.on('end', () => {
    req.body = body
    console.log('req.body is ' + req.body);
    res.end('data')
  })

  //protocol,slashes,auth,host,port,hostname,hash,search,query,pathname,path,href


  var callbackPath = purl;

  let patharray = Object.keys(Router.routes[method]);
  //.post is still .get
  patharray.forEach(path => {
    if (matchURLToPath(purl, path)) {
      callbackPath = path;
    }
  });

  if (Router.routes[method][callbackPath]) {
    let params = parseParams(callbackPath, purl);
    req.params = params; //params = {...}
    //if (method == 'post') { req.body = }
    Router.routes[method][callbackPath](req, res);
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
};

module.exports = Router;
