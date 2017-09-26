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
  // returns { path: 'foo/:id/:bar, params: { foo: 12, baz: 34 } }

  var paramResults = {};
  var formats = Object.keys(router.routes[method]);

  for (i = 0; i < formats.length; i++) {
    if (isPathParamed(formats[i])) {

      var formatPieces = formats[i].split('/');

      // convert format to regex for path matching
      formatPieces.forEach((piece) => {
        if (piece.startsWith(':')) {
          formatPieces[formatPieces.indexOf(piece)] = '([^\/]*)';
        }
      });
      var regexedFormat = RegExp(formatPieces.join('/'));

      // check if the regexed version matches the user supplied path
      if (regexedFormat.test(path)) {
        formatPieces = formats[i].split('/');
        var pathPieces = path.split('/');

        // record all named params in paramResults
        for (j = 0; j < formatPieces.length; j++) {
          if (formatPieces[j].startsWith(':')) {
            paramResults[formatPieces[j].slice(1, formatPieces[j].length)] = pathPieces[j];
          }
        }

        // leave format loop and return results
        return { path: formats[i], params: paramResults };
      }
    }
  }

  return { path: path, params: {} };
};

module.exports = PathParser;
