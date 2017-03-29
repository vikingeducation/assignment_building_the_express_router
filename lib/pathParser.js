const url = require('url');

const pathParser = {
  //  '/users/:id' => ['users', ':id']
  //  '/users/10'  => ['users', '10']

  splitPath: function(path) {
    return path.split('/').slice(1);
  },

  isDynamicParam: function(param) {
    var paramRegex = /:(.+)/;
    var results = paramRegex.exec(param);
    if (results) return results[1];
  },

  getParams: function(ourPath, reqPath) {
    var ourParams = this.splitPath(ourPath);
    var reqParams = this.splitPath(reqPath);

    // reject if routes have different number of params

    if (ourParams.length != reqParams.length) return false;

    // iterate through arrays, comparing each element by index
    // break out if anything doesn't match
    // if one of the elements is a dynamic param we can skip that one
    // return params object if we make it through, ex. { id: 10 }

    var results = {};

    for (var i = 0; i < ourParams.length; i++) {
      var dynamicParam = this.isDynamicParam(ourParams[i]);
      if (dynamicParam) {
        results.path = ourPath;
        results[dynamicParam] = reqParams[i];
        continue;
      }
      if (ourParams[i] != reqParams[i]) return false;
    }

    if (this.isNotEmpty(results)) return results;
  },

  isNotEmpty: function(obj) {
    if (obj) return Object.getOwnPropertyNames(obj).length != 0;
  }
};

module.exports = pathParser;
