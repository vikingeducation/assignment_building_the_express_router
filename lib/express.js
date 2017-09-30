const http = require('http');
const router = require('./router');
// const parser = require('./parser');

function express() {
  const app = {
    listen(port, callback) {
      const server = http.createServer(router.handle);
      server.listen(port, () => {
        callback();
      });
    }
  };
  router.setupHandlers(app);
  return app;
}

// class Express {
//   constructor() {
//     this.init();
//   }
//   init() {
//     router.setupHandlers(this);
//   }
//   listen(port, callback) {
//     const server = http.createServer(router.handle);
//     server.listen(port, () => {
//       callback();
//     });
//   }
// }
//
// function express() {
//   return new Express();
// }

module.exports = express;
