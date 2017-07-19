let pattern = {
  user: function (newPath[1] => {
    return {
      id: newPath[1]
    }
  },

  default: ,

};

let some_pattern = {}

let parser = path => {
  newPath = path.split("/");
  newPath = newPath.slice(1);
  console.log(newPath);
  if (Object.keys(pattern).includes(newPath[0])) {pattern[newPath[0]] = default}
    some_pattern = '/' +  pattern[newPath[0]]
   
  };
  console.log(pattern);
  


};


module.exports = parser;
