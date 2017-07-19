let ourExpress = require("./ourExpress");
let parser = require("./Parser");

let app = ourExpress();

// for each over object and do GET. to make it modular.
//var availableRoutes = { "/": "/ url", dogs: "dogs url", apples: "apples url" };

app.get("/", (req, res) => {
  res.end("hi");
});

app.get("/cats", (req, res) => {
  res.end("cats");
});

app.get("/dogs", (req, res) => {
  res.end("cats");
});

app.get("/dogs/:id", (req, res) => {
  // req.params
  res.end("hi" + parser.urlVar{":id"});
});

let port = process.env.PORT || 4000;
let host = "localhost";

app.listen(port, host, () => {
  console.log(`Listening at: http://${host}:${port}`);
});
