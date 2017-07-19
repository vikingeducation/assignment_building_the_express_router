const url = require('url');

//collect data from request
_getData = function(req, resolve) {
  let body = "";
  req.on('data', (data)=> {
    body += data;
  })
  req.on('end', ()=> {
    req.body = body;
    resolve();
  })
};

//match to callback and find params
function matchPath(path, req, verb) {
  var found = false;
  for (let routerPath in Router.routes[verb]) {
    let pathRegex = new RegExp(routerPath);
    if (pathRegex.test(path)) {
      var params = {};
      var registeredParams = Router.routes[verb][routerPath].params;
      var pathSections = path.split('/').slice(1);
      for (let index in registeredParams) {
        params[registeredParams[index]] = pathSections[index];
      }
      req.params = params;
      found = true;
      break;
    }
  }
  return found;
};

//access/run callback
function route(req, res, path, verb) {
  if (matchPath(path)) {
    Router.routes[verb][routerPath](req, res);
  }
  else {
    res.statusCode = 404;
    res.end('404 NOT FOUND, LOSER');
  }
};

// parse url & method, get Data, call route
function handle(req, res) {
  console.log('Routing... ... ...');
  let verb = req.method.toLowerCase();
  let path = url.parse(req.url).pathname;
  if (path.length > 1 && path[path.length - 1] === '/') {
    path = path.slice(0, path.length - 1);
  }
  var p = new Promise((resolve, reject) => {
    if (verb === "post") {
      _getData(req, resolve);
    } else {
      resolve();
    }
  })
  p.then(()=> {
    route(req, res, path);
  })

}

module.exports = handle;
