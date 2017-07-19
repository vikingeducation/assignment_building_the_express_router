const paramsRegex = /\:([a-zA-Z0-9_-]*)/;
const paramsRegexInsert = /([a-zA-Z0-9_-]*)/;

function parsePaths(path, callback) {
  pathParts = path.split('/').slice(1);
  let pathRegex = null;

  pathParts.forEach(part => {
    let addition = part;
    if (part && paramsRegex.test(part)) {
      addition = paramsRegexInsert.source;
    }

    if (!pathRegex) {
      pathRegex = RegExp('/' + addition);
    } else {
      pathRegex = new RegExp(pathRegex.source + '/' + addition);
    }
  });

  if (!pathRegex) {
    pathRegex = new RegExp('^/$');
  } else {
    pathRegex = new RegExp('^' + pathRegex.source + '/?$');
  }

  callback(pathRegex);
}

module.exports = parsePaths;
