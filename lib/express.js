"use strict";
const http = require("http");
const router = require("./router.js");

let express = () => {
  let app = (req, res) => {
    router(req, res);
  };

<<<<<<< HEAD
=======
  console.log("ROUTER : " + app);
  // router.initializeApp(app);

>>>>>>> 6d0bf0b7b3f66d68ec6356b313d4731d78633838
  app.listen = (path, host, callback) => {
    const server = http.createServer(app);
    return server.listen(path, host, callback);
  };

  return app;
};

module.exports = express;
