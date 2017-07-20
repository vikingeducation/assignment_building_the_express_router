let matchObject = {
  params: {}
};

var parser = (matches, path, method) => {
  // reset the matchObject each time parser is run
  matchObject = {
    params: {}
  };
  // matchesArr are the available method/path combinations in Router.routes
  let matchesArr = [];
  // for holding the split path
  let pathsArr = [];
  // pull in the methods from Router.routes using matches are the object and the method from the callback in router
  Object.keys(matches[method]).forEach(match => {
    matchesArr.push(normalize(match));
  });
  // cuts off the initial slash and splits on the remaining ones
  path = normalize(path).split("/");
  path.forEach(split => {
    pathsArr.push(split);
  });
  // if there was only one path, use directMatch. Otherwise, send to multiMatcher to be able to capture the req.params
  if (pathsArr.length < 2) {
    directMatch(matchesArr, pathsArr);
  } else {
    multiMatcher(matchesArr, pathsArr);
  }
  return matchObject;
};

let directMatch = (methods, paths) => {
  // only matching on the first index of the paths
  let pathToMatch = paths[0];
  for (var i = 0; i < methods.length; i++) {
    if (pathToMatch === methods[i]) {
      // readd the / due to how Router.routes is set up
      matchObject.method = `/${methods[i]}`;
      // set the isTrue to true so that the Router.handle function runs the callback once parser return in router.js
      matchObject.isTrue = true;
    }
  }
};

let multiMatcher = (methods, path) => {
  let pathToMatch = path[0];
  let matchingMethods = [];
  // capture the length of the path we want to match for use in the conditional
  let pLength = pathToMatch.length;
  for (var i = 0; i < methods.length; i++) {
    if (
      // slices the individual method on the length of the path that we want so that you aren't matching on foo/:bar, but rather foo
      methods[i].slice(0, pLength) === pathToMatch &&
      // after matching on length above, checks to see if the next character after the / is a :, if it is, set the object. Otherwise, just returns a 404 for now.
      methods[i][pLength + 1] === ":"
    ) {
      // sets params object. key is the matching method sliced after the : and the value is equal to the next index of the path. Only capturing the next available index, so foo/something/somethingelse wouldn't capture somethingelse
      matchObject.params[methods[i].slice(pLength + 2)] = path[1];
      // sets the method to the method that came before the parameterized one - means that you would need to set your app.get methods in sequential order.
      matchObject.method = `/${methods[i - 1]}`;
      matchObject.isTrue = true;
    }
  }
  return matchObject;
};

let normalize = str => {
  // cuts off first slash
  return (str = str.slice(1));
};

module.exports = parser;
