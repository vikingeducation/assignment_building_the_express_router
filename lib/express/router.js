const url = require('url');
const parser = require('./parser');

let Router = {};

const _extractPostData = (req, done) => {
  var body = '';
  req.on('data', (data) => {
    body += data;
  });
  req.on('end', () => {
    req.body = body;
    done();
  });
};

Router.methods = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'all'
];

Router.routes = {};
// app is a reference to an instance of Express class
// this creates methods named after http verbs on that class instance
Router.createHandlers = (app) => {
  Router.methods.forEach((method) => {
    Router.routes[method] = {};

    app[method] = (path, callback) => {
      path = parser.normalizePath(path);
      Router.routes[method][path] = callback;
    };
  });
};

Router.handle = (req, res) => {
  const method = req.method.toLowerCase();
  const path = url.parse(req.url).pathname;
  // Clears parameters from any previous request
  Router.reqParams = {};

  // if no normal path is found, router checks to see if path was registered with all,
  // then router checks to see if there is a matched parameterized path
  // the paramcheck saves parameters on Router.reqParams if true
  const handler = Router.routes[method][path] || 
    Router.routes["all"][path] || 
    Router._checkParameterizedPath(path, method);

  if (handler) {

    var p = new Promise((resolve) => {
      if (method === 'post') {
        _extractPostData(req, resolve);
      } else {
        resolve();
      }
    });

    p.then(() => {
      req.params = Router.reqParams;
      handler(req, res);
    });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

// checks through all of the saved routes for the given method
// and tries to match with the requested url
// returns the appropriate callback function for the requested url if found
// else will return as undefined
Router._checkParameterizedPath = (reqUrl, method) => {
  const urlSegments = reqUrl.split('/');
  const keys = Object.keys(Router.routes[method]);
  let handler;

  // iterate over the different paths saved to the router
  for (let i = 0; i < keys.length; i++) {
    // if the appropriate callback function is found at any point,
    // breaks out of the loop and returns that handler
    if (handler) {
      break;
    }
    const key = keys[i];
    // path Segments splits the saved path we are currently looking to into this format:
    // /foo/:bar/baz/:biz *becomes*
    // ["", "foo", ":bar"]
    // same with url segments
    const pathSegments = key.split('/');
    let isMatch;
    

    // Now, we iterate over path Segment. Remember:
    // pathSegments = "", "foo", ":bar", "baz", "biz"
    // url = "", "foo", "1", "baz", "2"
    for (let j = 0; j < pathSegments.length; j++) {

      // Compares segments of both arrays one by one
      const pathSegment = pathSegments[j];
      const urlSegment = urlSegments[j];

      // if first element is colon, we save the following as a parameter
      if (pathSegment[0] === ':') {
        const name = pathSegment.slice(1);
        const value = urlSegment;
        Router.reqParams[name] = value;
        isMatch = true;
      } else {
        isMatch = pathSegment === urlSegment;
      }

      if (!isMatch) {
        // if at any point a match is not found, we clear params and break out of this loop
        Router.reqParams = {};
        break;
      }
      // return the appropriate callback function if we looped through everything successfully
      if (isMatch && j === pathSegments.length - 1 && j === urlSegments.length - 1){
        handler = Router.routes[method][key];
      }
    }
  }

  return handler;
};



module.exports = Router;