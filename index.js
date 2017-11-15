var express = require("./lib/express.js");

var app = express;
app.listen(3000, "localhost", () => {
  console.log("app is listening");
});

app.get("/", (req, res) => {
  res.end("get method was fired");
});

app.get("/foo/:bar", (req, res) => {
  res.end("foo bar");
});

/*
app.get("/", (req, res) => {
  res.end("Hello World!");
});
*/
