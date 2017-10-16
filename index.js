'use strict';

// 1. Require Express
const express = require('./lib/express');

// 2. Create app
const app = express();

// 3. Create routes
//test with: localhost:4000
app.get('/', (req, res) => {
  res.end('GET request to / route\n');
});

//test with: localhost:4000/foo/1
app.get('/foo/:bar', (req,res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.write('path = /foo/:bar\n');
	res.end(`:bar = ${req.params.bar}`);
});

//test with: localhost:4000/foo/1/fiz/2
app.get('/foo/:bar/fiz/:baz', (req,res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.write('path = /foo/:bar/fiz/:baz<br>');	
	res.end(`:bar = ${req.params.bar}<br>:baz = ${req.params.baz}`);
});

//test with: localhost:4000/username/dc/password/s3cr3t
app.get('/username/:username/password/:password', (req,res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.write('path = /username/:username/password/:password<br>');	
	res.end(`:username = ${req.params.username}<br>:password = ${req.params.password}`);
});

//test with: 1) curl -d "foo=bar" http://localhost:4000
//           2) curl -H "Content-Type: application/json" -d '{ "foo": "bar" }' http://localhost:4000
app.post('/', (req, res) => {
  let data = req.body;

  if (req.headers['content-type'] === 'application/json') {
    data = JSON.parse(req.body);
    data = JSON.stringify(data, null, 2);
  }
  res.end(`\nDC's POST data: ${ data }`);
});

//test with: 1) curl -X PUT -d "foo=bar" http://localhost:4000
//           2) curl -X PUT -H "Content-Type: application/json" -d '{ "foo": "bar" }' http://localhost:4000
app.put('/', (req, res) => {
  let data = req.body;

  if (req.headers['content-type'] === 'application/json') {
    data = JSON.parse(req.body);
    data = JSON.stringify(data, null, 2);
  }
  res.end(`\nDC's PUT data: ${ data }`);
});

//test with: 1) curl -X PATCH -d "foo=bar" http://localhost:4000
//           2) curl -X PATCH -H "Content-Type: application/json" -d '{ "foo": "bar" }' http://localhost:4000
app.patch('/', (req, res) => {
  let data = req.body;

  if (req.headers['content-type'] === 'application/json') {
    data = JSON.parse(req.body);
    data = JSON.stringify(data, null, 2);
  }
  res.end(`\nDC's PATCH data: ${ data }`);
});

//test with: 1) curl -X DELETE -d "foo=bar" http://localhost:4000
//           2) curl -X DELETE -H "Content-Type: application/json" -d '{ "foo": "bar" }' http://localhost:4000
app.delete('/', (req, res) => {
  let data = req.body;

  if (req.headers['content-type'] === 'application/json') {
    data = JSON.parse(req.body);
    data = JSON.stringify(data, null, 2);
  }
  res.end(`\nDC's DELETE data: ${ data }`);
});

// 4. Start up a server, and listener
let port = process.env.PORT || 4000;
let host = 'localhost';

app.listen(port, host, () => {
  console.log(`Listening at: http://${ host }:${ port }/`);
});
