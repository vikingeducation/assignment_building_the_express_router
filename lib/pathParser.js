
function parse(path){
  var pathArr = [];
  var segments = path.split('/');
  segments.forEach(function(segment){

  })

  console.log(segments);
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
