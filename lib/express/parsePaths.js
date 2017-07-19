const paramsRegex = /\:([a-zA-Z0-9_-]*)/;
const paramsRegexInsert = /([a-zA-Z0-9_-]*)/;

function parsePaths(path) {
  if (path.length > 1 && path[path.length - 1] === '/') {
    path = path.slice(0, path.length - 1);
  }
  pathParts = path.split('/').slice(1);
  let pathRegex = null;
  let params = {};

  pathParts.forEach((part, index) => {
    // By default just add the literal path part
    let addition = part;
    // If we get a parameter, add our parameter matching regex instead
    if (part && paramsRegex.test(part)) {
      addition = paramsRegexInsert.source;
      params[index] = part.slice(1);
    }

    // Create our regex, or add to it
    if (!pathRegex) {
      pathRegex = RegExp('/' + addition);
    } else {
      pathRegex = new RegExp(pathRegex.source + '/' + addition);
    }
  });

  // Wrap our regex to only match full strings
  pathRegex = new RegExp('^' + pathRegex.source + '$');

  return { pathRegex: pathRegex, params: params };
}

module.exports = parsePaths;
