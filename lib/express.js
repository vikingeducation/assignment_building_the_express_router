'use strict';
const http = require('http');
// const router = require('./router.js');

let express = () => {
  let app = (req, res) => {
    router(req, res);
  };

  app.listen = () => {
    const server = http.createServer(app);
    server.listen.apply(server, arguments);
  };

  return app;
};

module.exports = express;
