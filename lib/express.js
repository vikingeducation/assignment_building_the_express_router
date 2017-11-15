// EXPRESS

const http = require('http');
const router = require('./router.js');
//const routes = require('./routes');

const createApplication = () => {
  const app = (req, res) => {
    router.handle(req, res);
  }

  router.initializeApp(app);

  app.listen = (...args) => {
    const server = http.createServer(app);
    return server.listen.apply(server, args);
  };

  return app;
}

module.exports = createApplication;
