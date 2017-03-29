const url = require('url');

// var testPath = 'localhost:3000/users/1054';
//
// var parsedPath = url.parse(testPath).pathname;
//
// console.log(parsedPath);
//
// var splitPath = parsedPath.split('/').slice(1);
//
// console.log(splitPath);
// end up with /users/1054
//app.get('/users/:id')

const parser = {
  parseUrl: function(path) {
    var parsedPath = url.parse(path).pathname;
    var splitPath = parsedPath.split('/').slice(1);
    return splitPath; //or an object? Need to figure that out
  },

  // /users/:id
  // /users/10

  // [users, :id]
  // [users, 10]

  // iterate through array
  // compare each element by index
  // if something doesn't match break out of the loop
  // if one of the elements is a dynamic param we can skip that one
  // return param if we make it through
  // { id: 10 }
  isParam: function(param) {
    var paramRegex = /:(.+)/;
    //console.log(param);
    console.log(param + ' ' + paramRegex.test(param));
    var results = paramRegex.exec(param);
    //  console.log(results);
    if (results) return results[1];
  },

  compare: function(registeredRoute, reqPath) {
    var splitRoute = this.parseUrl(registeredRoute);
    var splitPath = this.parseUrl(reqPath);

    if (splitRoute.length != splitPath.length) return false;
    var params = {};
    for (var i = 0; i < splitRoute.length; i++) {
      for (var j = 0; j < splitPath.length; j++) {
        var validParam = this.isParam(splitRoute[i]);
        //console.log(validParam);
        if (validParam) {
          params[validParam] = splitPath[j];
          //return params;
          //console.log(params);
        }
        if (splitRoute[i] != splitPath[j]) return false;
      }
    }
    return false;
  }
};

parser.compare('/users/:id', '/users/1000');
module.exports = parser;
