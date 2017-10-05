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
  let pattern;
  const paramKeys = [];
  if (path instanceof RegExp) {
    pattern = path.source;
    pattern = `${pattern.slice(0, 1)}\\/${pattern.slice(1, pattern.length)}`;
  } else {
    const stdPath = _standardizePath(path);
    let pathSplit = stdPath.split('/');
    pathSplit = pathSplit.map((subStr) => {
      if (subStr[0] === ':') {
        paramKeys.push(subStr.slice(1));
        return paramStub;
      }
      return subStr;
    });
    pattern = pathSplit.join('\\/');
    pattern = `^${pattern}\\/?$`;
  }

  return {
    pattern,
    paramKeys
  };
};

Parser.pathSearch = (req, router, method, path) => {
  const routePatterns = Object.keys(router.routes[method]);
  let pattern;
  let paramKeys;
  let paramValues;

  for (let i = 0; i < routePatterns.length; i++) {
    const regex = new RegExp(routePatterns[i], 'gi');
    const match = regex.exec(path);

    if (match && match[0] === path) {
      pattern = routePatterns[i];
      paramKeys = router.routes[method][pattern].paramKeys;
      paramValues = match.slice(1);
      break;
    }
  }

  return {
    pattern,
    paramKeys,
    paramValues
  };
};

module.exports = Parser;
