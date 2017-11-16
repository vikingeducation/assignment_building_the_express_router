// EXPRESS

const http = require('http');
const router = require('./router.js');
const parser = require('./testParser.js');
//const routes = require('./routes');

let urlArray = [];

const createApplication = () => {
  const app = (req, res) => {
    router.handle(req, res);
    console.log(req.url);
    urlArray = parser(req.url);
    console.log(urlArray);
  }

  router.initializeApp(app);

  app.listen = (...args) => {
    const server = http.createServer(app);
    return server.listen.apply(server, args);
  };

  return app;
}

module.exports = createApplication;
