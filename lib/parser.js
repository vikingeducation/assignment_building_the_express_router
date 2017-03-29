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

function parseUrl(path) {
  var parsedPath = url.parse(path).pathname;
  var splitPath = parsedPath.split('/').slice(1);
  return splitPath; //or an object? Need to figure that out
}

module.exports = parseURL;
