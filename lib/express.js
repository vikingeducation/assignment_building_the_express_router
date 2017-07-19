let http = require('http');

const Express = {};

Express.listen = (port, callback) {
  let server = http.createServer();


  server.listen(port, host, callback)
}

return express;

module.exports = Express;
