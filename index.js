let express = require("./lib/express.js");

const app = express();
var port = process.env.PORT || 3000;
var host = "0.0.0.0";

app.get("/", (req, res) => {
  res.end("Hi world!\n");
});

app.get("/foo", function(req, res) {
  res.end("this is foo");
});

app.get("/foo/:bar", function(req, res) {
  res.end();
});

app.post("/", function(req, res) {
  console.log("did this work?");
});

app.listen(port, host, () => {
  console.log(`Listening at: http://${host}:${port}`);
});
