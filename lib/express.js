let http = require('http');
let Router = require('./router');

function express(){
  function listen(port, host, callback){
    const server = http.createServer(Router.handle);
    server.listen(port, host, () => {
      console.log(`Server running at http://${host}:${port}/`);
    });
  }

  function get(path, callback){
    Router.get(path, callback)
  }

  return {
    listen: listen,
    get: get
  }
}

module.exports = express;
