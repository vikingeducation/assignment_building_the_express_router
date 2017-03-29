const express = require("./express");

// var app = express();

express.get('/puppies', (req, res) => {
  res.end('Puppies!!!\n');
});



