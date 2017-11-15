const http = require("http");

// app.get("/", (req, res) => {
//   console.log(req);
//   res.end("Hi world!\n");
// });
//
//
// app.listen(port, () => {
//   console.log(`Listening at: http://${host}:${port}`);
// });

let express = () => {
  let app = {};
  app.methods = ["get"];

  app.get = (path, callback) => {
    if (app.get[path]) {
      app.get[path] = app.get[path] || {};
      app[get] = (path, callback) => {
        app[get][path] = callback;
      };
    }

    app.listen = (port, hostname, callback) => {
      http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Hello World\n");
      });

      server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
      });
    };

    return app;
  };
};

module.exports = express;
