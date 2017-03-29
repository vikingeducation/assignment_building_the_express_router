const url = require('url')

let router = {}

router.routes = {}

router.routes.get = {}  

router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = req.url;
  // parse url parameters and store them in req.params
  pathPatternParser(path, )

  if (router.routes[method][path]) {
    router.routes[method][path](req, res);
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
}

module.exports = router;


function pathPatternParser(path, )

let regex /\/demo\/(*)/