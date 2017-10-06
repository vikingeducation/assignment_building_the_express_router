const http = require('http');
const url = require('url');
const pathParser = require('./parser.js');


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

  const patternsObj = app.routes[method];
  for (let pattern in patternsObj) {
    let maybeMatch = pathParser(path, pattern);

    if (maybeMatch) {
      const matchedPattern = maybeMatch.pattern;
      const matchedParams = maybeMatch.params;

      req.params = matchedParams;

      return app.routes[method][matchedPattern](req, res);
    }
  }

};



module.exports = express;
