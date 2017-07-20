let pattern = {},

var match = '/foo/1';
path = '/foo/:bar'

let parser = path => {
  var matchSlices = match.split('/').slice(1)
  var newPath = path.split('/').slice(1)
  if (matchSlices[0] === newPath[0]){
    if (newPath[1][0] === ':'){
      let params = { newPath[1] : matchSlices[1] }
      return params
    } else {
      return {};
    }
  } else {
    return null;
  }

};


module.exports = parser;
