var url = require('url');
var routeParser = require('./routes');


var Router = {};

Router.methods =[
  'get',
  'post'
];
Router.routes = {};



Router.methods.forEach((method) => {
  Router.routes[method] = Router.routes[method] || {};

  Router[method] = (path, callback) => {
    Router.routes[method][path] = callback;
  }
});


Router.routes['get'] = {};
Router.routes['get']['/foo/:bar'] = (req, res) => {
  res.end('GET /foo/:bar');
}
Router.routes['get']['/foo/:bar/fiz/:baz'] = (req, res) => {
  res.end('GET /foo/:bar/fiz/:baz');
}

// Router.routes['post']['/foo/:bar/fiz'] = (req, res) => {
//   res.end('POST /foo/:bar/fiz/ but POSTTTTTTttt');
// }

Router.handle = (req, res) => {
  var method = req.method.toLowerCase();
  var path = url.parse(req.url).pathname;
  var pathPattern;
  var availRoutes = Object.keys(Router.routes[method]);
  availRoutes.forEach( (pattern)=> {
    if ( routeParser.isMatching(path, pattern) ) {
      pathPattern = pattern;
    }
  })
  console.log(pathPattern)
  console.log(req.method)

  req.params = routeParser.getParams(path, pathPattern);

  if (Router.routes[method][pathPattern]) {
    Router.routes[method][pathPattern](req, res);
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};



module.exports = Router;
