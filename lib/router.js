const url = require("url");
//router
const Router = {};

Router.routes = {};

Router.handle = (req, res) => {
  var method = req.method.toLowerCase();
  var url_path = url.parse(req.url).pathname;

  var path = Router.is_parameter(method, url_path);
  req.params = Router.parse(path, url_path);

  if (!Router.routes[method][path]) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("You can no haz webpage\n");
  } else {
    Router.routes[method][path](req, res);
  }
};

Router.is_parameter = (method, url) => {
  //url : thing/11
  //matcher: thing/:id
  /*  Router.routes[method].forEach((element, index) => {
    var matcherArray = element.split("/");
    var urlArray = url.split("/");
    var is_match = true;
    for (var i = 0; i < matcherArray.length; i++) {
      if (matcherArray[i][0] === ":") {
        //ignore it
        continue;
      } else if (matcherArray[i] !== urlArray[i]) {
        is_match = false;
        break;
      }
    }
    if (is_match) {
      return element;
    }
  });*/
  for (var element in Router.routes[method]) {
    var matcherArray = element.split("/");
    var urlArray = url.split("/");
    var is_match = true;
    if (matcherArray.length !== urlArray.legnth) {
      continue;
    }
    for (var i = 0; i < matcherArray.length; i++) {
      if (matcherArray[i][0] === ":") {
        //ignore it
        continue;
      } else if (matcherArray[i] !== urlArray[i]) {
        is_match = false;
        break;
      }
    }
    if (is_match) {
      return element;
    }
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
};

module.exports = Router;
