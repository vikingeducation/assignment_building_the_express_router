"use strict";

// 1. Require Express
var express = require('./express');

// 2. Create an application with the
// returned function
var app = express();

// 3. Create routes via the app object
app.get('/:foo', (req, res) => {
  console.log("App.js file! Value of req.params", req.params);
  res.end(`Hi world! Hi world!! \n Here's the path:${ req.params.foo }`);
});

app.get('/', (req, res) => {
  res.end('Hi world!\n');
});

app.post('/', (req, res) => {
  res.end('This is the POST and req.body is', req.body);
});


// 4. Start up a server with app.listen
var port = process.env.PORT || 4000;
var host = 'localhost';

app.listen(port, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});