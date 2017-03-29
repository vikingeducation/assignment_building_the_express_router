let http = require('http');

let express = {};

express.listen = function(port, host, callback){
  const server = http.createServer((req, res) => {
    res.end('hello world\n')
  });
  server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
  });
}

express.get = function(path, callback){

}


module.exports = express;

