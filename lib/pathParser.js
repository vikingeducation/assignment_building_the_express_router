
function parse(path, routes)
  // var path = "localhost:3000/users/5"
  routes.forEach((route) => {
    var url = path;

    var reqSegments = url.split('/');
    var patSegments = route.split('/');

    var isMatch = true;
    var length = reqSegments.length;
    for(var i=0; i<length; i++){
      var reqSegment = reqSegments[i];
      var patSegment = patSegments[i];

      if(patSegment[0] !== ':'){
        if(reqSegment !== patSegment){
          isMatch = false;
          break;
        }
      }
    } // end of for loop
    return isMatch;
  });
}

module.exports = parse;


// var pattern = "localhost:3000/users/:id"
// var path = "localhost:3000/users/5"


// var pathArr = [];
// var segments = path.split('/');
// segments.forEach((segment) => {
//   if (segment[0] === ':') {
//     array.push('([^\\/]+)');
//   } else {
//     array.push(segment);
//   }
// });
// var pattern = array.join('/');
// //=> /path/([^\\/]+)/something/([^\\/]+)
// var regex = new RegExp(pattern, 'gi');
//
//
// var match = regex.exec('/foo/bar/biz/baz');
