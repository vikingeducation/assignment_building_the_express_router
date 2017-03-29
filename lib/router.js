const url = require('url')

let router = {}

router.routes = {}

router.routes.get = {}  

router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = req.url;

  let match;
  Object.keys(router.routes[method]).forEach(function(pattern){
    var regex = new RegExp(pattern, 'i');
    match = regex.exec(path);
  })


  //let matchParams = exec(regexPath);
  //req.params = matchParams
    //confirm match from pattern parser
  //add if match to req.params


  if (router.routes[method][path]) {
    router.routes[method][path](req, res);
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
}

module.exports = router;



