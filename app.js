const express = require("./lib/express");
const app = express();

const port = 3000;

app.listen(port, () => {
  console.log("Listening on port " + port);
});

app.get("/whee", (req, res) => {
	res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
	res.end("I sent a thing?");
})
