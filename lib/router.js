var url = require('url');

var router = {};

router.allowedMethods = ['get', 'post'];
router.routes = router.routes || {};

router.buildRoutes = (app) => {
  router.allowedMethods.forEach((method) => {
    router.routes[method] = router.routes[method] || {};
    app[method] = (path, callback) => {
      router.routes[method][path] = callback;
    }
  });
}

router.handle = (req, res) => {
  var method = req.method.toLowerCase();
  var path = url.parse(req.url).pathname;
  if (router.routes[method][path]) {
    router.routes[method][path](req, res);
  } else {
    res.writeHead(404);
    res.end('404 Not Found\n');
  }
}

module.exports = router;