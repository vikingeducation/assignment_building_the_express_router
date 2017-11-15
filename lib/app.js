"use strict";

// 1. Require Express
let express = require("./express");
let router = require("./router");

// 2. Create an application with the
// returned function
let app = express();

// 3. Create routes via the app object
app.get("/", (req, res) => {
  res.end("Hi world!\n");
});

app.get("/hackers/:id", (req, res) => {
  router.parser("/hackers/:id", 3);
  res.end("Hi hackers!\n");
});

// 4. Start up a server with app.listen
let port = process.env.PORT || 4000;
let host = "localhost";

app.listen(port, host, () => {
  console.log(`Listening at: http://${host}:${port}`);
});
