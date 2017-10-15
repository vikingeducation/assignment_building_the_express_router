'use strict';

// 1. Require Express
const express = require('./lib/express');

// 2. Create app
const app = express();

// 3. Create routes
app.get('/', (req, res) => {
  res.end('GET request to / route\n');
});

app.get('/foo/:bar', (req,res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.write('path = /foo/:bar\n');
	res.end(`:bar = ${req.params.bar}`);
});

app.get('/foo/:bar/fiz/:baz', (req,res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.write('path = /foo/:bar/fiz/:baz<br>');	
	res.end(`:bar = ${req.params.bar}<br>:baz = ${req.params.baz}`);
});

/*
router.post('/', (req, res) => {
  var data = req.body;

  // If the content type is JSON, parse the data into a JSON string
  if (req.headers['content-type'] === 'application/json') {
    data = JSON.parse(req.body);
    data = JSON.stringify(data, null, 2);
  }

  // Output the POST data
  res.end(`\nDC's POST data: ${ data }`);
});
*/

// 4. Start up a server, and listener
let port = process.env.PORT || 4000;
let host = 'localhost';

app.listen(port, host, () => {
  console.log(`Listening at: http://${ host }:${ port }/`);
});
