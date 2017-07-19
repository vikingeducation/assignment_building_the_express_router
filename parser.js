let pattern = {};

let parser = path => {
  newPath = path.split("/");
  newPath = newPath.slice(1);
  console.log(newPath);
  newPath.forEach(word => {
    pattern[word] = word;
  });
  console.log(pattern);
};

module.exports = parser;
