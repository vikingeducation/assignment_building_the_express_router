
function pathParse(path) {

  let regex = /\/\w+\/:\w+/g;
  let match, params = {};

  while (match = regex.exec(path)) {
    
    console.log(match[0]);
  }  
}

pathParse("http://localhost/4000/foo/:bar/foo/:biz");

/*module.exports = {
  pathParse
};*/