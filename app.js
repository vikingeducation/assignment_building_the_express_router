const app = require("./express");

// var app = express();

var port = 3000;
var host = 'localhost';

app.listen(port, host, () => {
	console.log("Still working?")
});

app.get("/puppies", (req, res) => {
  res.end("Puppies!!!\n");
});

app.get("/puppies/:foo", (req, res) => {
  res.end("Cats\n");
});

app.get('/puppies/:breed', function(req, res) {
  const breed = findBreed(req.params.breed)
  res.end(`${breed}`);
});