//match to callback and find params
function matchPath(req, path, verb, routes) {
  var foundPath = null;
  for (let routerPath in routes[verb]) {
    let pathRegex = new RegExp(routerPath);
    if (pathRegex.test(path)) {
      var params = {};
      var registeredParams = routes[verb][routerPath].params;
      var pathSections = path.split('/').slice(1);
      for (let index in registeredParams) {
        params[registeredParams[index]] = pathSections[index];
      }
      req.params = params;
      foundPath = routerPath;
      break;
    }
  }
  return foundPath;
}

//access/run callback
function route(req, res, path, verb, routes) {
  routerPath = matchPath(req, path, verb, routes);
  if (routerPath) {
    routes[verb][routerPath](req, res);
  } else {
    res.statusCode = 404;
    res.end('404 NOT FOUND, LOSER\n');
  }
}

module.exports = route;
