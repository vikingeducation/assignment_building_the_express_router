const url = require('url')

let router = {}

router.routes = {}

router.routes.get = {}  

router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = req.url;
  //confirm match from pattern parser
  //add if match to req.params
  pathPatternParser(path)

  if (router.routes[method][path]) {
    router.routes[method][path](req, res);
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
}

module.exports = router;


function pathPatternParser(path) {
  //  (/demo)(/mark)
  let parsedUrl = {}
  let regex = new Regex(`(\w+)$`)
  parseUrl.basePath = /(\/${path}\/)(*)/

  parseUrl.specificPath = 

  return parsedUrl

}