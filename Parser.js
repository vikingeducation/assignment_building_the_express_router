var CheckURL = function(str) {
  //feed entire url
  //check for all paths that start with colon
  newstr = str.split("/");
  for (i = 0; i < newstr.length; i++) {
    if (newstr[i][0] === ":") {
      if (i > 0) {
        newstr[i] = RandVarAssign(newstr[i - 1]);
      }
    }
  }
  return newstr.join();
};

var RandVarAssign = function(str2) {
  //feed the path before colon
  //assign variable based on this
  console.log(str2);
  return "1";
};

module.exports = { CheckURL: CheckURL };
