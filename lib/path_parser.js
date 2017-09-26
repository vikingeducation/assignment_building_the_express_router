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

      formatPieces.forEach((piece) => {
        if (piece.startsWith(':')) {
          formatPieces[formatPieces.indexOf(piece)] = '([^\/]*)';
        }
      });

      var regexedFormat = RegExp(formatPieces.join('/'));

      if (regexedFormat.test(path)) {
        formatPieces = formats[i].split('/');
        var pathPieces = path.split('/');

        for (j = 0; j < formatPieces.length; j++) {
          if (formatPieces[j].startsWith(':')) {
            paramResults[formatPieces[j].slice(1, formatPieces[j].length)] = pathPieces[j];
          }
        }

        return { path: formats[i], params: paramResults };
      }
    }
  }

  return { path: path, params: {} };
};

module.exports = PathParser;
