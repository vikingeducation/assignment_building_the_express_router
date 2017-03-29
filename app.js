"use strict";

// 1. Require Express
var express = require('./express');

// 2. Create an application with the
// returned function
var app = express();

// 3. Create routes via the app object
app.get('/:foo', (req, res) => {
  
  res.end('Hi world! Hi world!!\n');
});

app.get('/', (req, res) => {
  
  res.end('Hi world!\n');
});



// 4. Start up a server with app.listen
var port = process.env.PORT || 4000;
var host = 'localhost';

app.listen(port, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});