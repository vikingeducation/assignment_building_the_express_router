const paramsRegex = /\:[^\/]*/;
const paramsRegexInsert = /[^\/]*/;
const subset = ['?', '+', '*', '(', ')'];

function parseStringPath(path) {
  let params = {};
  let pathString = '^';
  path = cleanPath(path);
  pathParts = path.split('/');
  pathParts.forEach((part, index) => {
    // By default we just add the literal path part
    let addition = part;

    // if (part && stringPattern(part)) {
    //   // handle stringPatterns
    //   addition = parsePattern(part);
    // }

    // If we have a path parameter, we insert our parameter regex
    // We also grab our parameter name
    // and add it by its index to our params object
    if (part && paramsRegex.test(part)) {
      addition = paramsRegexInsert.source;
      params[index] = part.slice(1);
    }

    // Add this part onto the pathString
    pathString += '/' + addition;
  });

  // Wrap our regex to only match full strings
  let pathRegex = new RegExp(pathString + '$');
  return [pathRegex, params];
}

// Make sure we have a nicely formatted path to parse
function cleanPath(path) {
  // Strip whitespace
  path = path.trim();
  // Strip trailing slash
  if (path[path.length - 1] === '/') {
    path = path.slice(0, path.length - 1);
  }
  // Strip leading slash
  if (path[0] === '/') {
    path = path.slice(1);
  }

  return path;
}

// Return true if this part is a string pattern
function stringPattern(part) {
  isPattern = false;

  for (let char of subset) {
    if (part.includes(char)) {
      isPattern = true;
      break;
    }
  }

  return isPattern;
}

function parsePattern(part) {
  sanitizedPart = '';
  part.split().forEach(char => {
    if (['-', '.'].includes(char)) {
      sanitizedPart += '//';
    }
    sanitizedPart += char;
  });
  return sanitizedPart;
}

// Get our pathRegex and params. Return them
function parsePaths(path) {
  let pathRegex = null;
  let params = {};
  if (path instanceof RegExp) {
    pathRegex = path;
  } else {
    [pathRegex, params] = parseStringPath(path);
  }

  return { pathRegex: pathRegex, params: params };
}

module.exports = parsePaths;
