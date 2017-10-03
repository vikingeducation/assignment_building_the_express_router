const Parser = {};
const paramStub = '([^\\/]+)';

function _standardizePath(path) {
  let stdPath = path;
  if (stdPath.length > 1 && stdPath[stdPath.length - 1] === '/') {
    stdPath = stdPath.slice(0, stdPath.length - 1);
  }
  return stdPath;
}

Parser.parsePath = (path) => {
  const stdPath = _standardizePath(path);
  const paramKeys = [];
  let pattern = '^';
  let pathSplit = stdPath.split('/');
  pathSplit = pathSplit.map((subStr) => {
    if (subStr[0] === ':') {
      paramKeys.push(subStr.slice(1));
      return paramStub;
    }
    return subStr;
  });
  const pathJoin = pathSplit.join('\\/');
  pattern = `${pattern}${pathJoin}\\/?$`;

  return {
    pattern,
    paramKeys
  };
};

Parser.pathSearch = (req, res, router, method, path) => {
  let pattern;
  let paramKeys;
  let paramValues;
  const routePatterns = Object.keys(router.routes[method]);

  for (let i = 0; i < routePatterns.length; i++) {
    // const regex = /`^${routePatterns[i]}\/?$`/gi;
    const regex = new RegExp(routePatterns[i], 'gi');
    const match = regex.exec(path);

    if (match && match[0] === path) {
      pattern = routePatterns[i];
      paramKeys = router.routes[method][pattern].paramKeys;
      paramValues = match.slice(1);
      break;
    }
  }
  console.log(pattern, paramKeys, paramValues);
  return {
    pattern,
    paramKeys,
    paramValues
  };
};

module.exports = Parser;

// pathSplit.forEach((subStr) => {
//   let patternStub = subStr;
//   if (subStr[0] === ':') {
//     paramKeys.push(subStr.slice(1));
//     patternStub = paramStub;
//   }
//   pattern = `${pattern}\/${patternStub}`;
//   let regex = new RegExp(pattern);
//   console.log(pattern);
//   console.log(regex);
// });
