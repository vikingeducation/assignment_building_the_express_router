const express = require("./lib/express");
const app = express();

const port = 3000;

app.listen(port, () => {
  console.log("Listening on port " + port);
});

//bug : no longer will serve just /whee correctly
app.get("/whee/:id", (req, res) => {
  res.end("ID: " + req.params.id);
});

app.get("/whee", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("I sent a thing?");
});

app.get("/whuh/:id/yup/:num", (req, res) => {
  res.end(`ID: ${req.params.id}\nNum: ${req.params.num}`);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.enc();
});
