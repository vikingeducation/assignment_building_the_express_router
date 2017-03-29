const url = require('url')

let router = {}

router.routes = {}

router.routes.get = {}  

router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = req.url;
  //confirm match from pattern parser
  //add if match to req.params
  let parsedUrl = pathPatternParser(path);
  let basePath = parsedUrl.basePath;
  let parameter = parsedUrl.parameter

  if (router.routes[method][path]) {
    router.routes[method][path](req, res);
  } else if (router.routes[method][basePath]) {
    req.params = parameter;
    router.routes[method][basePath](req, res);
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
}

module.exports = router;


function pathPatternParser(path) {
  let parsedUrl = {};
  ary = path.split("/");
  parsedUrl.parameter = ary.pop;
  parsedUrl.basePath = ary.join("/");
  return parsedUrl
}

