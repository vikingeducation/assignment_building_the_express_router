let http = require('http');
let Router = require('./router');

let express = {};

express.listen = function(port, host, callback){
  const server = http.createServer(Router.handle);
  server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
  });
}

express.get = function(path, callback){
  Router.get(path, callback)
}

module.exports = express;
