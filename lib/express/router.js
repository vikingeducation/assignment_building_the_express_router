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
  'post'
];

Router.routes = {};

// app is a reference to an instance of Express class
// this creates methods named after http verbs on that class instance
Router.createHandlers = (app) => {
  Router.methods.forEach((method) => {
    Router.routes[method] = {};

    app[method] = (path, callback) => {

    /*
      First, we want to check if path passed in is parameterized. IF SO, return like this:
      /foo/:bar => /foo/

      Then register that simply.
    
    */
  /*
    Maybe we can start with when we register the path here
    app.get('/foo/:bar', callback);

    if parser.hasParameters(path), path = parser.parsePath(path);

    so path becomes just /foo/

    Then request object is /foo/1
    OK SO IF I SPLIT USER PATH LIKE THIS
    reqpath.split(originalpath);

    if it's a parameterized path, it will always give me back exactly two elements
    0: ""
    1: "parameter"    

    
  */
      Router.routes[method][path] = callback;
    };
  });
};

Router.handle = (req, res) => {
  const method = req.method.toLowerCase();
  const path = url.parse(req.url).pathname;

  /*
  
  */
  

  if (Router.routes[method][path]) {

    var p = new Promise((resolve) => {
      if (method !== 'get') {
        _extractPostData(req, resolve);
      } else {
        resolve();
      }
    });

    p.then(() => {
      Router.routes[method][path](req, res);
    });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

module.exports = Router;