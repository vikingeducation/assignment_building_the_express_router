var router = require('./router');

var isPathParamed = (path) => {
  var paramed = false;
  var segs = path.split('/');

  segs.forEach((seg) => {
    if (seg.startsWith(':')) {
      paramed = true;
    }
  });

  return paramed;
};

var PathParser = {};

PathParser.parse = (method, path, router) => {
  // returns either [ original_path, {} ] or [ parameterized_path, { foo: 12, baz: 34 } ]

  // check for regex matched path in router.routes
  // var regex = /:(.*?)$/g;
  // var regex = /^[a-z0-9]+$/i;

  var existingUrls = Object.keys(router.routes[method]);
  var validPathWithParams = null;

  existingUrls.forEach((setPath) => {
    var paramsObj = {};

    var pathArr = path.split('/');
    var setPathArr = setPath.split('/');

    setPathArr.forEach((param) => {
      if (param.startsWith(':')) {
        var index = setPathArr.indexOf(param);

        // place param in paramsObj
        paramsObj[setPathArr[index - 1]] = pathArr[index];

        // change the element in the pathArr to the :named version for matching
        pathArr[index] = param;
      }

      if (setPathArr.join('/') === pathArr.join('/')) {
        validPathWithParams = [setPath, paramsObj];
      }
    });
  });

  if (validPathWithParams) {
    return validPathWithParams;
  } else {
    return [path, {}];
  }
};

module.exports = PathParser;
