var url = require('url');
var routeParser = require('./routes');


var Router = {};

Router.methods =[
  'get',
  'post',
  'put',
  'patch',
  'delete'
];
Router.routes = {};

var _extractPostData = (req, done) => {
  var body = '';
  req.on('data', (data) => {
    body += data;
  });
  req.on('end', () => {
    req.body = body;
    done();
  });
}

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

    var p = new Promise( (resolve ) => {
      if (method !== 'get') {
        _extractPostData(req, resolve);
      } else {
        resolve();
      }
    });

    p.then( function() {
      Router.routes[method][pathPattern](req, res);
    })

  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};



module.exports = Router;
