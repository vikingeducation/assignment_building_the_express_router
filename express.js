// express.js

const http = require('http');
const router = require('./router');


const createApplication = () => {
  const app = (req, res) => {
    // Forward these objects to router
    router.handle(req, res);
  };

  // Initialize app so it has other methods
  router.initializeApp(app);
  // What HTTP methods are support?
  // How do I register route handlers? Callbacks?

  app.listen = (...args) => {
    const server = http.createServer(app);
    return server.listen.apply(server, args);
  };

  return app;
};

module.exports = createApplication;

