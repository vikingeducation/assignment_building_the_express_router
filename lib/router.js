const url = require("url");
const puppies = require('./puppies');

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
  var method = req.method.toLowerCase();

  var path = url.parse(req.url).pathname;
  console.log(path);

  function findBreed(breed) {
    return puppies[breed];
  }

  if (router.routes[method][path]) {
    // Respond with the correct handler
    // for the HTTP method and path
    router.routes[method][path](req, res);
  } else if (path.split('/')[0].toLowerCase() === 'puppies') {
      function findPuppy(path.split('/')[1].toLowerCase()) {

      }
  } else {
    // If the handler is not found
    // respond with a 404
    res.statusCode = 404;
    res.end("404 Not Found");
  }
};

module.exports = router;
