const paramsRegex = /\:[^\/]*/;
const paramsRegexInsert = /[^\/]*/;
const subset = ['?', '+', '*', '(', ')'];

function parseStringPath(path) {
  let params = {};

  // Begin our regix with start of line
  let pathRegex = new RegExp('^');

  path = cleanPath(path);
  pathParts = path.split('/');
  pathParts.forEach((part, index) => {
    // By default we just add the literal path part
    let addition = part;

    if (part && stringPattern(part)) {
      // Handle string-based patterns
      addition = escapePattern(part);
    } else if (part && paramsRegex.test(part)) {
      // Handle path parameters
      addition = paramsRegexInsert.source;
      params[index] = part.slice(1);
    }

    // Add this part onto the pathString
    pathRegex = new RegExp(pathRegex.source + '/' + addition);
  });

  // End our pathRegex with end of line
  pathRegex = new RegExp(pathRegex.source + '$');
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

// Escape the '-' and '.' characters for our pattern
function escapePattern(part) {
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
