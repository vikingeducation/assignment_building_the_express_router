const url = require('url');
const parser = require('./parser');

const Router = {};
Router.routes = {};
Router.routes.get = {};
Router.routes.post = {};

// function _standardizePath(path) {
//   const standardizedPath = path.split('');
//   const rootPath = path.length === 1;
//
//   if (path[0] !== '/' && !rootPath) {
//     standardizedPath.unshift('/');
//   }
//   if (path[path.length - 1] === '/' && !rootPath) {
//     standardizedPath.pop();
//   }
//   return standardizedPath.join('');
// }

// Router.methods = [
//   'get',
//   'post'
// ];

// Router.methods.forEach((method) => {
//   Router.routes[method] = Router.routes[method] || {};
//   Router.params[method] = Router.params[method] || {};
//
//   Router[method] = (path, callback) => {
//     // path = _standardizePath(path);
//     Router.routes[method][path] = callback;
//   };
// });

// Router.methods.forEach((method) => {
//   Router.routes[method] = Router.routes[method] || {};
//   // Router.params[method] = Router.params[method] || {};
//
//   Router[method] = (pathPattern, callback) => {
//     // path = _standardizePath(path);
//     const [pathRegex, pathParams] = parser(pathPattern);
//     Router.routes[method][pathRegex] = callback;
//     Router.params[method][pathRegex] = pathParams;
//   };
// });

// Router.setupHandlers = (app) => {
//   Router.methods.forEach((method) => {
//     Router.routes[method] = {};
//     Router.params[method] = {};
//
//     Router[method] = (pathPattern, callback) => {
//       // path = _standardizePath(path);
//       const [pathRegex, pathParams] = parser(pathPattern);
//       Router.routes[method][pathRegex] = callback;
//       Router.params[method][pathRegex] = pathParams;
//     };
//   });
// };

// function _standardizePath(path) {
//   if (path.length > 1 && path[path.length - 1] === '/') {
//     path = path.slice(0, path.length - 1);
//   }
//   console.log(path);
//   return path;
// }

Router.handle = (req, res) => {
  const method = req.method.toLowerCase();
  const path = url.parse(req.url).pathname;
  // path = _standardizePath(path);

  const pathSearch = parser.pathSearch(req, res, Router, method, path);
  const { pattern, paramKeys, paramValues } = pathSearch;

  if (pattern) {
    req.params = {};
    for (let i = 0; i < paramKeys.length; i++) {
      req.params[paramKeys[i]] = paramValues[i];
    }

    const p = new Promise((resolve) => {
      if (method !== 'get') {
        _extractPostData(req, resolve);
      } else {
        resolve();
      }
    });

    p.then(() => {
      Router.routes[method][pattern].callback(req, res);
    });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

// const p = new Promise((resolve) => {
//   if (method !== 'get') {
//     _extractPostData(req, resolve);
//   } else {
//     resolve();
//   }
// });
//
//
// p.then(() => {
//   const handler = Router._patternSearch(req, res, path, method);
//   req.params = Router.params;
//   handler(req, res);
// })
//   .catch((err) => {
//     console.log('Error! Routing failed:');
//     console.log(err);
//     res.statusCode = 500;
//     res.end('<h1>500 Internal Server Conflagration!</h1>\n');
//   });

// Router._patternSearch = (req, res, path, method) => {
//   let handler;
//   const pathKey = Router._matchPath(path, method);
//   if (pathKey) {
//     handler = Router.routes[method][pathKey];
//   } else {
//     res.statusCode = 404;
//     res.end('404 Not Found');
//   }
//   return handler;
// };
//
// Router._matchPath = (path, method) => {
//   let foundPath;
//   for (let pathKey in Router.routes[method]) {
//     let pathRegex = new RegExp(pathKey);
//     if (pathRegex.test(path)) {
//       foundPath = pathKey;
//       Router._setParams(path, method, pathKey);
//       break;
//     }
//   }
//   return foundPath;
// };
//
// Router._setParams = (path, method, pathKey) => {
//   const routerParams = Router.params[method][pathKey];
//   let urlStubs = path.split('/');
//   urlStubs = urlStubs.filter(e => e.length > 0);
//   console.log(routerParams, urlStubs);
//
//   const params = routerParams;
//   for (let index in routerParams) {
//     params[index] = urlStubs[routerParams[index]];
//   }
//   Router.params = params;
// };

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
// function _pathSearch(method, path, req) {
//   let foundPath = null;
//   for (let methodPath in router.routes[method]) {
//     let pathRegex = new RegExp(methodPath);
//     if (pathRegex.test(path)) {
//       _setReqParams(method, path, req, methodPath);
//       foundPath = methodPath;
//       break;
//     }
//   }
//   return foundPath;
// }
