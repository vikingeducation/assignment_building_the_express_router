const http = require('http');
const url = require('url');


function express() {
  return app;
}

const app = {
  listen: (port, cb) => {
    const server = http.createServer(app.handleReq);

    server.listen(port, cb);
  },
  methods: ['get'],
};

app.routes = {};

app.methods.forEach((method) => {
  app.routes[method] = app.routes[method] || {};

  app[method] = (path, cb) => {
    app.routes[method][path] = cb;
  }
});

app.handleReq = (req, res) => {
  const method = req.method.toLowerCase();
  const path = url.parse(req.url).pathname;

  if (app.routes[method][path]) {
    app.routes[method][path](req, res);
  } else {
    res.end('404 Not Found');
  }
};








module.exports = express;
