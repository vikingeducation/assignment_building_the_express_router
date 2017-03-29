let urlRegex = {}

urlRegex.formatUrl = (path) => {
  var array = [];
  var param_names = [];
  var segments = path.split('/');
  segments.forEach((segment) => {
    if (segment[0] === ':') {
      array.push('([^\\/]+)');
      param_names.push(segment);
    } else {
      array.push(segment);
    }
  });

  var pattern = array.join('\\/');
  
  formattedUrlObj {
    param_names: param_names,
    pattern: pattern
  };
  return formattedUrlObj;
}

var routePattern = urlRegex.formatUrl('/demo/:mark/user/:id');

var regex = new RegExp(routePattern, 'gi');
var match = regex.exec('/demo/nicolas/user/45');


console.log(match);



module.exports = urlRegex;