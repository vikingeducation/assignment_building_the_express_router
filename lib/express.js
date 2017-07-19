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
      router.routes[method] = router.routes[method] || {};
      router.routes[method][path] = callback;
      debugger;
    };
  });
  /*,

    get: (path, callback) => {
      router.routes["get"] = router.routes["get"] || {};
      router.routes["get"][path] = callback;
    },

    post: (path, callback) => {
      router.routes["post"] = router.routes["post"] || {};
      router.routes["post"][path] = callback;
    },
    delete: (path, callback) => {
      router.routes["delete"] = router.routes["delete"] || {};
      router.routes["delete"][path] = callback;
    }
  };*/

  return my_router;
};
