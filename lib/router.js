const url = require('url')

let router = {}

router.routes = {}

router.routes.get = {}  

router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = url.parse(req.url).pathname;

  if (router.routes[method][path]) {
    router.routes[method][path](req, res);
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
}

module.exports = router;