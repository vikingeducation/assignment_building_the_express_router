let urlRegex = {}

urlRegex.formatUrl = (path) => {
  var array = [];
  var paramNames = [];
  var segments = path.split('/');
  segments.forEach((segment) => {
    if (segment[0] === ':') {
      array.push('([^\\/]+)');
      paramNames.push(segment);
    } else {
      array.push(segment);
    }
  });

  var pattern = array.join('\\/');
  
  formattedUrlObj = {
    paramNames: paramNames,
    pattern: pattern
  };
  return formattedUrlObj;
}


module.exports = urlRegex;