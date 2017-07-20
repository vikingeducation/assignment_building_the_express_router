const url = require("url");
const qs = require("qs");

const Router = {};

Router.routes = {};

Router.regexRoutes = {};

Router.handle = (req, res) => {
  var method = req.method.toLowerCase();
  var url_path = url.parse(req.url).pathname;

  //searching for string routes
  if (url_path.length > 1 && url_path[url_path.length - 1] === "/") {
    url_path = url_path.slice(0, url_path.length - 1);
  }
  var path = Router.is_parameter(method, url_path); // /whee/:id

  //if I don't know what your talking about
  if (!Router.routes[method][path] && !Router.regexRoutes[method][path]) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("You can no haz webpage\n");
  } else {
    //in case of asynchronous calls
    var p = new Promise((resolve, reject) => {
      if (method !== "get") {
        //set req.body = data with parsePost
        Router.parsePost(req, resolve); //will parsing work with regex????
      } else {
        resolve();
      }
    });
    p
      .then(function() {
        if (typeof path === "string") {
          req.params = Router.parse(path, url_path);
          Router.routes[method][path](req, res);
        } else {
          Router.regexRoutes[method][path](req, res);
        }
      })
      .catch(err => {
        throw err;
      });
  }
};

Router.parsePost = (req, callback) => {
  var body = "";

  req.on("data", data => {
    body += data;
  });

  req.on("end", err => {
    switch (req.headers["content-type"]) {
      case "application/json":
        body = JSON.parse(body);
        body = JSON.stringify(body, null, 2);
        break;
      case "application/x-www-form-urlencoded":
        body = qs.parse(body);
        body = JSON.stringify(body, null, 2);
    }
    req.body = body;
    callback();
  });
};

Router.is_parameter = (method, url) => {
  for (var element in Router.routes[method]) {
    var matcherArray = element.split("/");
    var urlArray = url.split("/");

    //check for extra '/' that were given

    var is_match = true;

    //prevents somthing/:id and something/ from being matched
    if (matcherArray.length !== urlArray.length) {
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
  ///regex checking
  for (var element in Router.regexRoutes[method]) {
    var take_out_slash = element.slice(1, element.length - 1);
    const regex = new RegExp(take_out_slash); // /waldo/ || "/waldo/"????
    if (regex.test(url)) {
      return regex;
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
