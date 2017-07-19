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
  res.end("hi foo!");
});

app.get('/users/:name', (req, res) => {
  res.end(`This person's name is: ${req.params.name}`);
});

app.get('/users/:first/:last', (req, res) => {
  res.end(`First name: ${req.params.first} -> Last name: ${req.params.last}`);
});

app.post('/', (req, res) => {
  res.end(req.body);
});

app.put('/users/:first/:last', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    res.end('PUT');
});

// 4. Start up a server with app.listen
var port = process.env.PORT || 3000;
var host = 'localhost';

app.listen(port, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});
