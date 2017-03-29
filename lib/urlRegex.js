let urlRegex = {}

  urlRegex.formatUrl = (path) => {
    var array = [];
    var segments = path.split('/');
    segments.forEach((segment) => {
      if (segment[0] === ':') {
        array.push('([^\\/]+)');
      } else {
        array.push(segment);
      }
    });

    var pattern = array.join('/');
    // var regex = new RegExp(pattern, 'gi');
    // var match = regex.exec(`${path}`);
    return pattern
  }

  // returnParams: function(path) {
  //   //modify to return only affected groups
  //   //maybe with counter
  //   //maybe with two arrays
  //   var path = '/path/:to/something/:else';

  //   var array = [];
  //   var segments = path.split('/');
  //   segments.forEach((segment) => {
  //     if (segment[0] === ':') {
  //       array.push('([^\\/]+)');
  //     } else {
  //       array.push(segment);
  //     }
  //   });

  //   var pattern = array.join('/');
  //   var regex = new RegExp(pattern, 'gi');
  //   var match = regex.exec(`${path}`);
  //   return match
  // }
}

module.exports = urlRegex;