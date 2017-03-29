const url = require("url");
const puppies = require("./puppies");

var router = {
  routes: {
    get: {},
    post: {}
  }
};

router.handle = (req, res) => {
  var method = req.method.toLowerCase();
  var path = url.parse(req.url).pathname;
  if (router.routes[method][path]) {
    router.routes[method][path](req, res);
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
};

module.exports = router;

//
// ["/puppies/:breed", "/houses/house"]
// "/puppies/collie"
// {breed: 'collie'};

//if first and have second then output object
//first param contains : do a thing
