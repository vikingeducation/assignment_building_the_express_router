var express = require('./lib/express');
var app = express();

app.listen(3000, 'localhost');

app.get('/', (req, res) => {
  res.end('Hello routing file!');
});

