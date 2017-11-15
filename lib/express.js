const http = require('http');
const router = require('./router.js');
//const routes = require('./routes');

const createApplication = () => {
  const app = router.handle;

  // initialize app so it has other methods
  app.listen = (...args) => {
    const server = http.createServer(app);
    return server.listen.apply(server, args);
  };

/*  app.get = (path, callback) = > {

  };
*/  
  return app;
}




module.exports = createApplication;
