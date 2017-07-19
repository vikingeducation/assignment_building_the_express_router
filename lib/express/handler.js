const url = require('url');

// Route requests
function handle(req, res) {
  console.log('Routing... ... ...');
  const verb = req.method.toLowerCase();
  let path = url.parse(req.url).pathname;

  // Remove trailing slashes
  if (path.length > 1 && path[path.length - 1] === '/') {
    path = path.slice(0, path.length - 1);
  }

  // Iterate over the path regexes for our given verb
  // testing them against the current path
  var found = false;
  for (let routerPath in Router.routes[verb]) {
    let pathRegex = new RegExp(routerPath);
    if (pathRegex.test(path)) {
      var params = {};
      var registeredParams = Router.routes[verb][routerPath].params;
      pathSections = path.split('/').slice(1);
      for (let index in registeredParams) {
        params[registeredParams[index]] = pathSections[index];
      }
      req.params = params;
      // Path matches! Route away...
      Router.routes[verb][routerPath](req, res);
      found = true;
      break;
    }
  }
  if (!found) {
    res.statusCode = 404;
    res.end('404 NOT FOUND, LOSER');
  }
}

module.exports = handle;
