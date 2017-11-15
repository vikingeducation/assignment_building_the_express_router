var url = require('url');

var Router = {};

Router.methods=[
  'get',
  'post'
]

Router.routes = {};

Router.methods.forEach((method)=>{
  Router.routes[method]= Router.routes[method] || {};
  //router.routes['get'] is now an object
  //below creates router.get = ('/', (req, res) => { })
  Router[method] = (path, callback) => {
    Router.routes[method][path] = callback;
  };
})

Router.handle = (req, res) => {
  //res.end("hello from router");
  var method = req.method.toLowerCase()
  var path = url.parse(req.url).pathname

  if (Router.routes[method][path]) {
    Router.routes[method][path](req, res);
  } else {
    res.statusCode = 404;
    res.end('404 Not Found')
  }
};

module.exports = Router;
