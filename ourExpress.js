var httpObj = require("http");
var path = "";

var methods = {
"get": function(newPath, newCallbacks) {
  routes[newPath] = routes[newPath] || {};
  app[method] = function(path, callback) {
       routes[newPath][path] = callback;
     };
  return;
},
"post": console.log("place holder"),
"Listen": function(req,res, function() => { let server = httpObj.createServer(()=>{console.log("server created");}));}
};
var routes = {};
var pathCallback = {
  path: "",
  callback: function() {
    console.log("im the saved callback");
  }
};

function AllTheThings(newPort, newHost, newRoutes, newMethods) {
  var testVariable = "this is a test variable";
  var routes = {};

  return methods;
}

var app = {

  //StartServer: function(port, host, callback) {
    //create server
    // server.listen(port, host, () => {
    //   console.log(`Server running at http://${host}:${port}/${path}`);
    // });





    return;
  },

  Get: function(newPath, newCallbacks) {
    //pathCallback[path] = newPath;
    routes = newpath;
    methods = newCallbacks;
    //  console.log("meow" + newPath + callback);
    //  pathCallback[callback] = callback();
    //console.log("meow" + pathCallback[path] + pathCallback[callback]);
    return;
  }
};
// routes = {};
// methods.forEach(function(method) {
//   routes[method] = routes[method] || {};
//   app[method] = function(path, callback) {
//     path.routes[method][path] = callback;
//   };
// });

// let port = process.env.PORT || 4000;
// let host = "localhost";
//
// app.StartServer(port, host, (req, res) => {
//   // console.log("yay!!!!!!!!")
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World\n");
// });
//
// app.Get("cat", () => {
//   console.log("meow call back");
// });
//let exportApp = AllTheThings();
module.exports = app;
