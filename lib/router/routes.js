// var pattern = '/foo/:bar/goo/:num';
//    var path = '/foo/1/goo/23';


// path = path.replace(/(^\/)|(\/$)/g, '');
// var parsedRoute = {}

function isMatching(path, pattern) {
  var patternArr = pattern.split('/');
  var pathArr = path.replace(/(\/$)/, '').split('/');
  if (patternArr.length == pathArr.length) {
    for(var i=0; i < pathArr.length; i++) {
      if ( !( (pathArr[i] == patternArr[i]) || (Number.isInteger(parseInt(pathArr[i])) && patternArr[i].match(/(:.*?)/))) ) {
        return false;
      }
    }
    return true
  }
}

function getParams(path, pattern) {
  var hash = {};
  var patternArr = pattern.split('/');
  var pathArr = path.split('/');
  for(var i=0; i < pathArr.length; i++) {
    if (Number.isInteger(parseInt(pathArr[i])) && patternArr[i].match(/(:.*?)/)) {
      hash[patternArr[i]] = parseInt(pathArr[i]);
    }
  }
  return hash;
}

module.exports = {
  getParams,
  isMatching
}
