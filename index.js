'use strict';

// 1. Require Express
var express = require('./lib/express');

// 2. Create an application with the
// returned function
var app = express();

// 3. Create routes via the app object
app.get('/', (req, res) => {
  res.end('Hi world!\n');
});

app.get('/:foo', (req, res) => {
  //console.log(req.params);
  res.end("hi foo!");
})

app.post('/', (req, res) => {
  res.end(req.body);
})



// 4. Start up a server with app.listen
var port = process.env.PORT || 3000;
var host = 'localhost';

app.listen(port, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});
