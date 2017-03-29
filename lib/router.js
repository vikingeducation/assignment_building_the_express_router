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
  
  function compareArrays(arr1, arr2) {
      arr1.forEach( (el, index) => {
          console.log(`${el} : ${arr2[index]}`);
        if(el !== arr2[index]) {
          console.log(`entered if statement`);
          return(el);
        }
      });
    }

  let chunks = path.split('/').slice(1);
  for( key in router.routes.get ) {
    myArr = key.split('/').slice(1);
    console.log(`Split key: ${myArr}`);
    console.log(`Returned: ${compareArrays(myArr, chunks)}`);

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
