

var parser = {};

parser.match = (path, pattern) => {
  var parseResults = {};

  parseResults.patternRegExp = parser.convertToRegExp(pattern);

  parseResults.isMatch = (parseResults.patternRegExp.test(path));

  //parameters should be key value pairs
  // parseResults.parameters
  if (parseResults.isMatch) {
    parseResults.parameters = parser.getParameters(path, pattern, parseResults.patternRegExp);
  };
  // console.log(parseResults.parameters);
  // console.log(patternRegExp.exec(path));

  return parseResults;
};

parser.getParameters = (path, pattern, patternRegExp) => {
  console.log(patternRegExp);
  var parameters = {};
  var match = patternRegExp.exec(path);
  var matchIndex = 1;

  var splitPattern = pattern.split('/');
  console.log(splitPattern);
  splitPattern.forEach( (token) => {
    if (token[0] === ':') {
      console.log(token);
      parameters[token.split(':')[1]] = match[matchIndex];
      matchIndex += 1;
    }
  });
  return parameters;
}

parser.testIfMatch = (path, regExp) => {

}

parser.convertToRegExp = (pattern) => {
  var splitPattern = pattern.split('/');
  var matchingRegExpString = '';

  if (splitPattern.length === 2) {
    matchingRegExpString = '\/$';
  } else {
    splitPattern.forEach( (token) => {
      if (token.length > 0) {
        //at each pattern, add a forward slash to RegExp
        matchingRegExpString += '\/'
        //if string starts with a colon, it's a parameter and can be anything
        if (token[0] === ':') {
          matchingRegExpString += '(.+)';
        } else {
        //else the string must match exactly
          matchingRegExpString += token;
        }
      }
    });
  }
  //return the regular expression
  // return new RegExp(matchingRegExpString);
  return matchingRegExpString
};

module.exports = parser;
