let Parser = {};

// Formats paths in this manner:
// e.g. /foo
// e.g. /foo/bar
Parser.normalizePath = (path) => {
  let normalizedPath = path.split('');
  let isRoot = path.length === 1;
  
  if (path[0] !== '/' && !isRoot) {
    normalizedPath.unshift('/');
  }

  if (path[path.length - 1] === '/' && !isRoot) {
    normalizedPath.pop();
  }

  return normalizedPath.join('');
};

module.exports = Parser;