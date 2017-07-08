var url = require('url');
var pathParser = require('./pathParser');

var router = {};

router.allowedMethods = ['get', 'post'];
router.routes = router.routes || {};

router.buildRoutes = (app) => {
  router.allowedMethods.forEach((method) => {
    router.routes[method] = router.routes[method] || {};
    app[method] = (path, callback) => {
      pathObj = pathParser.destructure(path);
      router.routes[method][pathObj.shortPath] = {
        callback: callback,
        arg: pathObj.match
      };
    }
  });
}

router.handle = (req, res) => {
  var method = req.method.toLowerCase();
  var path = url.parse(req.url).pathname;
  if (router.routes[method][path]) {
    shortPath = pathParser.paramaterize(req, path, router[method]);
    router.routes[method][shortPath].callback(req, res);
  } else {
    res.writeHead(404);
    res.end('404 Not Found\n');
  }
}

module.exports = router;