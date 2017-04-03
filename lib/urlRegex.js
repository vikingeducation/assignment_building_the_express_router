let urlRegex = {}

urlRegex.parsePath = (path) => {
  let paramNames = [];
  let segments = path.split('/');
  // Substitute each segment starting with ':' for a pattern
  // that will match and capture anything between '/'s
  segments = segments.map((segment) => {
    if (segment[0] === ':') {
      paramNames.push(segment);
      return '([^\\/]+)';
    } else {
      return segment;
    }
  });

  let pattern = segments.join('\\/');
  
  return {
    paramNames: paramNames,
    pattern: pattern
  };
}

urlRegex.pathMatcher = (req, res, router, method, path) => {
  let pattern;
  let paramNames;
  let paramValues;
  var routePatterns = Object.keys(router.routes[method]);

  for (var i=0; i<routePatterns.length; i++) {
    let regex = new RegExp(routePatterns[i], 'gi');
    let match = regex.exec(path);   

    if (match && match[0] == path) {
      pattern = routePatterns[i];
      paramNames = router.routes[method][pattern].paramNames
      paramValues = match.slice(1);
      break;
    }
  }
  return {
    pattern: pattern,
    paramNames: paramNames,
    paramValues: paramValues
  }
}


module.exports = urlRegex;



