const url = require("url");

var router = {
  routes: {
    get: {
      "/": (req, res) => {
        res.end("hello");
      },
      "/william": (req, res) => {
        res.end("hello");
      }
    },
    post: {}
  }
};

router.handle = (req, res) => {
  // Get the request's HTTP method
  var method = req.method.toLowerCase();

  // Get the URL path of the request
  var path = url.parse(req.url).pathname;

  // if url : do something differnt
  console.log(path);

  // Route matching would happen here
  if (router.routes[method][path]) {
    // Respond with the correct handler
    // for the HTTP method and path
    router.routes[method][path](req, res);
  } else {
    // If the handler is not found
    // respond with a 404
    res.statusCode = 404;
    res.end("404 Not Found");
  }
};

module.exports = router;
