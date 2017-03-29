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

  isParam: function() {
    var paramRegex = /:.+/;
  }

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
  
  compare: function(registeredRoute, reqPath) {
    var splitRoute = this.parseUrl(registeredRoute);
    var splitPath = this.parseUrl(reqPath);
    if (splitRoute.length != splitPath) return false;
    var params = {};
    for (var i = 0; i < splitRoute.length; i++) {
      for (var j = 0; j < splitPath.length; j++) {
        if (splitRoute[i] != splitPath[j]) return false;

      }
    }
  }

};

module.exports = parser;
