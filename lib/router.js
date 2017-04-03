const url = require('url');
const urlRegex = require('./urlRegex');

let router = {}
router.routes = {}
router.routes.get = {}
router.routes.post = {}


router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = req.url;

  let pathMatch = urlRegex.pathMatcher(req, res, router, method, path);
  let pattern = pathMatch.pattern;
  let paramNames = pathMatch.paramNames;
  let paramValues = pathMatch.paramValues;

  if (pattern) {
    req.params = {};
    for (let i = 0; i<paramNames.length; i++) {
      req.params[paramNames[i]] = paramValues[i];
    } 

    var p = new Promise((resolve) => {
      if (method != 'get') {
        _extractPostData(req, resolve);
      } else {
        resolve();
      }
    });

    p.then(function() {
      router.routes[method][pattern].callback(req, res);
    });
  } else {
      res.statusCode = 404;
      res.end("404 Not Found");
  }
}


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



module.exports = router;



