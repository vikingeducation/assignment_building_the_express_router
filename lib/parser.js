
function parsePath(path) {

  let names = [];
  let values = [];
  let params = path.split('/');
  
  params.forEach((param) => {
    if (param[0] === ':') {
      values.push(param.slice(1));
      names.push('([^\\/]+)');
    } else {
      names.push(param);
    }
  });

  let pattern = names.join('/');
    
  return {
    pattern: pattern,
    values: values
  }
}

// testing it

let temp = parsePath("/foo/:bar/fiz/:baz/fee/:blep/foe/:bloop");

let regex = new RegExp(temp.pattern);
console.log("regex: " + regex + "\n");

let match = regex.exec("/foo/1/fiz/31/fee/51/foe/91", 'g');

let num = 0
while (match.length > 1) {
  match.shift();                                    // first index: /foo/1/fiz/31
  console.log(`{ ${temp.values[num]}: ${match[0]} }`);  //bar: 1 //baz: 31
  num++;
}
