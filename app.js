var express = require('./lib/express');
var app = express();

app.get('/', (req, res) => {
  res.end('Hi world!\n');
});

var port = process.env.PORT || 4000;
var host = 'localhost';

app.listen(port, host, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});