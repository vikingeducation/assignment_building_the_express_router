let urlVar = {};
var words = "dogs";
var CheckURL = function(str) {
  //feed entire url
  //check for all paths that start with colon
  newstr = str.split("/");
  for (i = 0; i < newstr.length; i++) {
    if (newstr[i].toString() === words) {
      urlVar[newstr[i + 1]] = RandVarAssign(newstr[i + 1]);
      newstr[i + 1] = urlVar[newstr[i + 1]];

      if (i + 1 <= newstr.length) {
      }
    }
  }
  console.log(urlVar, "urlVar");
  console.log(newstr.join("/") + "what word is this");
  return newstr.join("/");
};

var RandVarAssign = function(str2) {
  //urlVar[str2] = 1;
  //feed the path before colon
  //assign variable based on this
  console.log(str2);
  return 1;
};

let parsePattern = function(url, path) {
  let pathArr = path.split("/");
  let urlArr = url.split("/");

  urlArr.forEach(item => {
    if (item[0] === ":") {
      let key = item.slice(1);
      let value = pathArr[pathArr.length - 1];

      urlVar[key] = value;

      console.log(urlVar);
    }
  });
};

module.exports = {
  CheckURL: CheckURL,
  parsePattern: parsePattern,
  urlVar
};
