var pathParser = {};

checkForArg = () => {

}

checkForNotArg = () => {

}

pathParser.paramaterize = (path, req, routerMethod) => {
  match = path.match(/\/.*\/(.*)$/)[1];
  param = {};
  if (routerMethod[match].arg) {
    param[routerMethod[match].arg] = match;
    req.params = param;
  }
  return path.match(/^.*\/(.*)/)[1];
}

pathParser.destructure = (path) => {
  match = path.match(/\/:(.*)$/)[1];
  shortPath = path.match(/^(.*)\/:.*/)[1];
  return {
    match: match,
    shortPath: shortPath
  }
}

module.exports = pathParser