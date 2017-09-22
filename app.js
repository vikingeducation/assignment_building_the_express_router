const express = require('./lib/express');

var app = express();

app.get('/', (req, res) => {
  // console.log(req);
  res.end('Hello from the get method!');
});

var port = process.env.PORT || 3000;
var host = 'localhost';

app.listen(port, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});
