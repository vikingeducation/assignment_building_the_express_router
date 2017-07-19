const url = require("url");
//router
const Router = {};

Router.routes = {};

Router.handle = (req, res) => {
  var method = req.method.toLowerCase();
  var path = url.parse(req.url).pathname;

  if (!Router.routes[method][path]) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("You can no haz webpage\n");
  } else {
    Router.routes[method][path](req, res);
  }
};

Router.parse = (matcher, url) => {
  var params = {};

  var matcherArray = matcher.split("/");

  var urlArray = url.split("/");

  for (var i = 0; i < matcherArray.length; i++) {
    if (matcherArray[i][0] === ":") {
      var parameter = matcherArray[i].slice(1);
      params[parameter] = urlArray[i];
    }
  }

  return params;
}

module.exports = Router;
