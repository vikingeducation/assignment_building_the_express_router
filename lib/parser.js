const paramRegexStub = /[^\/]*/;

// const pattern = '/foo/:bar/fiz/:baz';
// const path = '/foo/1/fiz/hi5';

function Parser(path) {
  const params = {};
  let pathRegex = /^/;

  let pathSplit = path.split('/');
  pathSplit = pathSplit.filter(e => e.length > 0);
  pathSplit.forEach((subStr, index) => {
    let regexStub = subStr;

    if (subStr[0] === ':') {
      regexStub = paramRegexStub.source;
      params[index] = subStr.slice(1, subStr.length);
    }
    pathRegex = new RegExp(`${pathRegex.source}/${regexStub}`);
  });
  pathRegex = new RegExp(`${pathRegex.source}\/?$`);

  return [pathRegex, params];
}

module.exports = Parser;
