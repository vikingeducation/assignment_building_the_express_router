let express = require("./lib/express.js");

const app = express();
var port = process.env.PORT || 3000;
var host = "0.0.0.0";

app.get("/", (req, res) => {
  res.end("Hi world!\n");
});

app.get("/favicon.ico", function(req, res) {
  console.log("stupid favicon");
});

app.listen(port, host, () => {
  console.log(`Listening at: http://${host}:${port}`);
});
