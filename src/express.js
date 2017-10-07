const http = require('http');
const url = require('url');
const pathParser = require('./parser.js');
const addPostDataToBody = require('./addPostDataToBody.js');


function express() {
  return app;
}

const app = {
  listen: (port, cb) => {
    const server = http.createServer(app.handleReq);

    server.listen(port, cb);
  },
  methods: ['get', 'post', 'delete', 'put', 'patch'],
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

      addPostDataToBody(req)
        .then((newReq) => {
          req = newReq;
          req.params = matchedParams;

          return app.routes[method][matchedPattern](req, res);
        })
        .catch((err) => {
          console.error(err);
        })

    }
  }

};



module.exports = express;
