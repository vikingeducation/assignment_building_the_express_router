function maybeContainsParam(seg) {
  return seg[0] === ':';
}


function pathParser(path, pattern) {
  
  const patternSegments = pattern.split('/');
  const pathSegments = path.split('/');
  const matched = {
    'pattern': pattern,
    params: {},
  };

  if (patternSegments.length !== pathSegments.length) {
    return false;
  }

  for (let i = 0; i <= patternSegments.length - 1; i++) {
    let patternSeg = patternSegments[i];
    let pathSeg = pathSegments[i];

    if (!maybeContainsParam(patternSeg) && patternSeg !== pathSeg) {
      return false;
    } else if (!maybeContainsParam(patternSeg) && patternSeg === pathSeg) {
      continue;
    } else if (maybeContainsParam(patternSeg)) {
      matched.params[patternSeg.slice(1)] = pathSeg;
    }
  }

  return matched;
}



module.exports = pathParser;
