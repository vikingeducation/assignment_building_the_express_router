const url = require('url');
const parser = require('./parser');

const Router = {
  routes: {},
  params: {}
};

function _standardizePath(path) {
  const standardizedPath = path.split('');
  const rootPath = path.length === 1;

  if (path[0] !== '/' && !rootPath) {
    standardizedPath.unshift('/');
  }
  if (path[path.length - 1] === '/' && !rootPath) {
    standardizedPath.pop();
  }
  return standardizedPath.join('');
}

Router.methods = [
  'get',
  'post'
];

Router.setupHandlers = (app) => {
  Router.methods.forEach((method) => {
    Router.routes[method] = {};
    Router.params[method] = {};

    app[method] = (path, callback) => {
      // path = _standardizePath(path);
      let [pathRegex, pathParams] = parser(path);
      Router.routes[method][pathRegex] = callback;
      Router.params[method][pathRegex] = pathParams;
    };
  });
};

Router.handle = (req, res) => {
  const method = req.method.toLowerCase();
  const path = url.parse(req.url).pathname;
  console.log(path);

  const handler = Router.routes[method][path] || Router._patternSearch(path, method);

  if (handler) {
    const p = new Promise((resolve) => {
      if (method !== 'get') {
        _extractPostData(req, resolve);
      } else {
        resolve();
      }
    });

    p.then(() => {
      req.params = Router.params;
      handler(req, res);
    });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

Router._patternSearch = (requestedUrl, method) => {
  let handler;
  const pathKey = Router._matchPath(requestedUrl, method);
  if (pathKey) {
    handler = Router.routes[method][pathKey];
  }
  return handler;
};

Router._matchPath = (requestedUrl, method) => {
  let foundPath;
  for (let pathKey in Router.routes[method]) {
    let pathRegex = new RegExp(pathKey);
    if (pathRegex.test(requestedUrl)) {
      foundPath = pathKey;
      Router._setParams(requestedUrl, method, pathKey);
      break;
    }
  }
  return foundPath;
};

Router._setParams = (requestedUrl, method, pathKey) => {
  const routerParams = Router.params[method][pathKey];
  let urlStubs = requestedUrl.split('/');
  urlStubs = urlStubs.filter(e => e.length > 0);
  console.log(routerParams, urlStubs);

  const params = {};
  for (let index in routerParams) {
    params[routerParams[index]] = urlStubs[index];
  }
  Router.params = params;
};

module.exports = Router;

// function _setReqParams(method, path, req, methodPath) {
//   const methodParams = Router.params[method][methodPath];
//   let pathSplit = path.split('/');
//   pathSplit = pathSplit.filter(e => e.length > 0);
//   const params = {};
//   for (let index in methodParams) {
//     params[methodParams[index]] = pathSplit[index];
//   }
//   req.params = params;
// }
//
//
function _pathSearch(method, path, req) {
  let foundPath = null;
  for (let methodPath in router.routes[method]) {
    let pathRegex = new RegExp(methodPath);
    if (pathRegex.test(path)) {
      _setReqParams(method, path, req, methodPath);
      foundPath = methodPath;
      break;
    }
  }
  return foundPath;
}
