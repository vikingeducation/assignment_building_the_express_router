var app = require("./ourExpress");
let port = process.env.PORT || 4000;
let host = "localhost";

app.get({"/cat","/notcat"},{"POST","NotPOST"});

app.Get("/newcat", (req, res) => {
  app.StartServer(port, host, (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World\n");
  });
});

//std in do get function
