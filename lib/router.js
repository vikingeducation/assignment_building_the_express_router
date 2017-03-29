const url = require('url')

let router = {}

router.routes = {}

router.routes.get = {}  

router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = req.url;
  let pathPattern;
  let paramsMatch;
  req.params = {};
  Object.keys(router.routes[method]).forEach(function(pattern){
    let regex = new RegExp(pattern, 'gi');
    let match = regex.exec(path);
    if (match) {
      pathPattern = pattern;
      paramsMatch = match;
    }
  })


  if (paramsMatch) {
    let paramNames = router.routes[method][pathPattern].paramNames;
    console.log(paramNames)
    for (let i = 0; i<paramNames.length; i++) {
      req.params[paramNames[i]] = paramsMatch[i+1]
    }
    router.routes[method][pathPattern].callback(req, res);
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
}

module.exports = router;



