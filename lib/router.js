const url = require('url')

let router = {}
router.routes = {}
router.routes.get = {}
router.routes.post = {}

var _extractPostData = (req, done) => {
  var body = '';
  req.on('data', (data) => {
    body += data;
  });
  req.on('end', () => {
    req.body = body;
    done();
  });
};

router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = req.url;

  if (method == "get") {
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
    });


    if (paramsMatch) {
      let paramNames = router.routes[method][pathPattern].paramNames;
      for (let i = 0; i<paramNames.length; i++) {
        req.params[paramNames[i]] = paramsMatch[i+1]
      }
      router.routes[method][pathPattern].callback(req, res);
    } else {
      res.statusCode = 404;
      res.end("404 Not Found");
    }
  } else if (method == "post") {
      var p = new Promise((resolve) => {
        _extractPostData(req, resolve);
      });
      p.then(function() {
        router.routes[method][path](req, res);
      });
  }

    // Respond with the correct handler
    // for the HTTP method and path
    p.then(function() {
      Router.routes[method][path](req, res);
    });
}



module.exports = router;



