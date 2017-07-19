var express = require("express");

var app = express();

app.get("/", (req, res) => {
  console.log(req);
  res.end("Hi world!\n");
});

var port = process.env.PORT || 4000;
var host = "localhost";

app.listen(port, () => {
  console.log(`Listening at: http://${host}:${port}`);
});
