
function parse(path, routes){
  //console.log("inside parse function " + Object.keys(routes));
  var isMatch = false;
  //var path = "localhost:3000/users/5"
  Object.keys(routes).forEach((route) => {
    //console.log(route);
    if(route !== '/'){
        var url = path;
        var reqSegments = url.split('/');
        var patSegments = route.split('/');
        // console.log("Route" , route);
        // console.log("Req segments " , reqSegments);
        // console.log("Pat setments ", patSegments);

        var length = reqSegments.length;
        for(var i=1; i<length; i++){
            var reqSegment = reqSegments[i];
            var patSegment = patSegments[i];
            //console.log("Pattern Segment ", patSegment);
            //console.log("Req Segment ", reqSegment);

            if(patSegment && patSegment[0] === ':'){
              //console.log(reqSegment, patSegment);
                isMatch = true;
                break;
          }
        }// end of for loop
    } // end of if
    console.log("isMatch ", isMatch);
    return isMatch;
  }); // end of for each
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
