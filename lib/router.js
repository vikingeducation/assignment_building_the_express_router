const url = require("url");
const qs = require("qs");
//router
const Router = {};

Router.routes = {};

Router.handle = (req, res) => {
  console.log(Router.routes);
  var method = req.method.toLowerCase();
  var url_path = url.parse(req.url).pathname;
  if (url_path.length > 1 && url_path[url_path.length - 1] === "/") {
    url_path = url_path.slice(0, url_path.length - 1);
  }

  var path = Router.is_parameter(method, url_path); // /whee/:id
  if (!Router.routes[method][path]) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("You can no haz webpage\n");
  } else {
    //in case of asynchronous calls
    console.log(req.headers);
    var p = new Promise((resolve, reject) => {
      if (method !== "get") {
        Router.parsePost(req, resolve);
      } else {
        resolve();
      }
    });
    p
      .then(function() {
        req.params = Router.parse(path, url_path); // {id: 556}
        Router.routes[method][path](req, res);
      })
      .catch(err => {
        throw err;
      });
  }
};

Router.parsePost = (req, callback) => {
  var body = "";
  console.log(`resolve `);

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
