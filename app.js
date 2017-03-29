const app = require("./express");
const puppies = require("./lib/puppies");
// var app = express();

var port = 3000;
var host = "localhost";

app.listen(port, host, () => {
  console.log("Still working?");
});

app.get("/puppies", (req, res) => {
  res.end("Puppies!!!");
});

app.get("/puppies/:breed", function(req, res) {
  const breed = puppies[req.params.breed];
  res.end(`${breed}`);
});

app.get("/", function(req, res) {
  const name = people[req.params.name];
  res.end(`${name}`);
});
