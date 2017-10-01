function parsePath(path) {

  let names = [];
  let params = [];
  let matches = path.split('/');
  
  matches.forEach((match) => {
    if (match[0] === ':') {
      params.push(match.slice(1));    // array for params (bar, baz, boop) or (uname, pword)
      names.push('([^\\/]+)');        // build regex pattern
    } else {
      names.push(match);              // build regex pattern with names (foo, fiz, foe) or (username, password)
    }
  });

  let pattern = names.join('/');
    
  return {
    pattern: pattern,
    params: params
  }
}

function matchPath(routes, path) {

  let pattern, names, values;
  let num = 0;
  let patterns = Object.keys(routes);

  for (let item in patterns) {
    let regex = new RegExp(patterns[num], 'gi'); // regex from path pattern in app.js
    let match = regex.exec(path);           // path = passed in url string, all matches obtained

    if (match && (match[0] === path)) {
      pattern = patterns[num];
      names = routes[pattern].paramNames    // get all name, value pairs
      values = match.slice(1);
      break;
    }
    num++;
  }

  return {
    pattern: pattern,
    names: names,
    values: values
  }
}

module.exports = {
  parsePath: parsePath,
  matchPath: matchPath
}