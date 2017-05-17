const http = require('http');
const router = require('./router.js');
const DEFAULT_PORT = 3000;

class Express {
  constructor() {
    this.propagateRouter();
  }

  // passes router module a reference to current instance of Express class
  // this dynamically creates http verb functions on this instance
  // i.e. this.get() and this.post(); 
  propagateRouter() {
    router.createHandlers(this);
  }

  listen(port, callback) {
    port = port || DEFAULT_PORT;

    const host = 'localhost';
    const server = http.createServer(router.handle);

    server.listen(port, host, callback);
  }
}

const init = () => {
  return new Express();
};

module.exports = init;