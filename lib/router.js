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

  function compareArrays(internalArr, urlArr) {
    var objectToReturn = {};
    if (internalArr.length !== urlArr.length) {
      return false;
    }
    for (var i = 0; i < internalArr.length; i++) {
      if (internalArr[i][0] !== ":") {
        if (internalArr[i] !== urlArr[i]) {
          console.log(`entered if statement`);
          return false;
        }
      } else {
        for (var dog in puppies) {
          if (dog === urlArr[i]) {
            objectToReturn[urlArr[i]] = puppies[dog];
            res.end(JSON.stringify(objectToReturn));
          }
        }
      }
    }
    return true;
  }

  let urlArr = path.split("/").slice(1);
  for (var key in router.routes.get) {
    myArr = key.split("/").slice(1);
    console.log(`Split key: ${myArr}`);
    console.log(compareArrays(myArr, urlArr));
  }

  // function chopper(path) {
  //   ;
  //   /// /puppies/collie/fat/
  //   let test = router.routes.get;
  //   chunks.forEach(chunk) => {};
  //     if (router.routes.get[chunk]) {
  //       test += chunk;
  //     }
  //     '[puppies][collie]'
  // }

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
