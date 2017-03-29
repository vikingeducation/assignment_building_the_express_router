const express = require("./express");

// var app = express();

express.get("/puppies", (req, res) => {
  res.end("Puppies!!!\n");
});

express.get("/puppies/:foo", (req, res) => {
  res.end("Cats\n");
});
