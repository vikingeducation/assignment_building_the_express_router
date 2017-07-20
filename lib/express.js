const http = require("http");
const router = require("./router.js");
const url = require("url");

module.exports = function() {
  const my_router = {
    listen: (port, callback) => {
      const server = http.createServer(router.handle);
      let hostname = "localhost";
      server.listen(port, hostname, callback);
    }
  };

  const methods = ["get", "post", "put", "patch", "delete"];

  methods.forEach(method => {
    my_router[method] = (path, callback) => {
      debugger;
      if (typeof path === "object") {
        router.regexRoutes[method] = router.regexRoutes[method] || {};
        router.regexRoutes[method][path] = callback;
      } else {
        router.routes[method] = router.routes[method] || {};
        router.routes[method][path] = callback;
      }
    };
  });
  return my_router;
};
