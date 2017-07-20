var parser = (matches, path) => {
  let matchesArr = [];
  let pathsArr = [];
  Object.keys(matches.get).forEach(match => {
    matchesArr.push(normalize(match));
  });
  path = normalize(path).split("/");
  path.forEach(split => {
    pathsArr.push(split);
  });
  // console.log(`matches array ${matchesArr}`);
  // console.log(`paths array ${pathsArr}`);
  matcher(matchesArr, pathsArr);
};

let matcher = (potentialMatches, path) => {
  let matches = {};
  let pathToMatch = path[0];
  for (var i = 0; i < potentialMatches.length; i++) {
    if (potentialMatches[i] === pathToMatch && path[1][0] === ":") {
      matches[path[1]] = potentialMatches[i];
      console.log(matches);
    }
  }
};

let normalize = str => {
  return (str = str.slice(1));
};

module.exports = parser;

// let router = require("./router");
//
// console.log(router.patterns);

// let pattern = {},
//
// var match = '/foo/1';
// path = '/foo/:bar'
//
// let parser = path => {
//   var matchSlices = match.split('/').slice(1)
//   var newPath = path.split('/').slice(1)
//   if (matchSlices[0] === newPath[0]){
//     if (newPath[1][0] === ':'){
//       let params = { newPath[1] : matchSlices[1] }
//       return params
//     } else {
//       return {};
//     }
//   } else {
//     return null;
//   }
//
// };
//
//
// module.exports = parser;
