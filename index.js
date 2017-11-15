var express = require("./lib/express.js");

var app = express;
app.listen(3000, "localhost", () => {
  //console.log("app is listening");
});

app.get("/", (req, res) => {
  res.end("get method was fired");
});

app.get("/foo/:bar", (req, res) => {
  let keys = Object.keys(req.params);
  keys.forEach(key => {
    res.write(req.params[key]);
  });
  res.end("foo bar");
  //we want foo bar to show up on /foo/johndoe
});

app.post("/post/:form", (req, res) => {
  res.end("form posted");
});
