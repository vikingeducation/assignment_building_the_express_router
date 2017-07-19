let ourExpress = require("./ourExpress");

let app = ourExpress();

app.get("/", (req, res) => {
  res.end("hi");
});

app.get("/cats", (req, res) => {
  res.end("cats");
});

app.get("/dogs", (req, res) => {
  res.end("cats");
});

let port = process.env.PORT || 4000;
let host = "localhost";

app.listen(port, host, () => {
  console.log(`Listening at: http://${host}:${port}`);
});
