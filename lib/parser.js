const named = require('named-regexp').named;


// rewrite the path if it has params to use named-regexp format
function pathParse(path) {
  var regex = path;
  var namedMatch = new RegExp('/:(.+?)/|/:(.+?)$', 'g')
  var match = namedMatch.exec(regex);

  var matchResults = [];
  while (match != null) {
    matchResults.push(match[1] || match[2]);
    match = namedMatch.exec(regex);
  }
  matchResults.forEach(function(param) {
    regex = regex.replace('/:' + param, '/(:<' + param + '>.+?)')
  });
  regex = '^' + regex + '$'
  return regex;
}

function findPath(paths, path, req) {

  for (pathRegex in paths) {
    var re = named(new RegExp(pathRegex));
    var matched = re.exec(path);
    if (matched) {
      var badMatch = false;
      for (param in matched.captures) {
        if (/\//.test(param)) badMatch = true;
      }
      if (badMatch === false) {
        req.params = matched.captures;
        return pathRegex;
      }

    }
  }
  return false;
}


module.exports = {
  pathParse,
  findPath
};
