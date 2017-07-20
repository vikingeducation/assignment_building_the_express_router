const express = require('./lib/express');

var app = express();

app.get('/', (req, res) => {
  console.log('no params...');
  res.end('Hi world!\n');
});

app.get('/ab(cd)?e', (req, res) => {
  console.log('You matched a pattern!');
  res.end('You matched a pattern\n');
});

app.get('/a+-b+e/:parent', (req, res) => {
  console.log(JSON.stringify(req.params));
  console.log('You matched a pattern and a param!');
  res.write(JSON.stringify(req.params));
  res.end('You matched a pattern and a param\n');
});

app.get(/^\/[a-zA-Z]{3}\d{3}$/, (req, res) => {
  console.log('Whoa! A Regex!');
  res.end('Whoa! A Regex!\n');
});

app.get('/:name', (req, res) => {
  console.log('One param!');
  res.write(JSON.stringify(req.params));
  res.end('One Param!!!!\n');
});

app.get('/:name/:pet', (req, res) => {
  console.log('Two params!');
  res.write(JSON.stringify(req.params));
  res.end('Two params!!!!\n');
});

app.get('/:name/has/:pet/', (req, res) => {
  console.log('Two params surrounding a literal!');
  res.write(JSON.stringify(req.params));
  res.end('Two params surrounding a literal!!!!\n');
});

app.post('/', (req, res) => {
  console.log('We got posted!');
  console.log(JSON.stringify(req.body));
  res.write(JSON.stringify(req.body));
  res.end('Gone. Postal.\n');
});

app.put('/', (req, res) => {
  console.log('We, were put upon.');
  console.log(req.body);
  res.write(JSON.stringify(req.body));
  res.end('Put me down!\n');
});

app.patch('/', (req, res) => {
  console.log('Patch me in! I have the message!');
  console.log(req.body);
  res.write(JSON.stringify(req.body));
  res.end('Have you applied the patches?\n');
});

app.delete('/', (req, res) => {
  console.log('[This object intentionally left blank]');
  console.log(req.body);
  res.write(JSON.stringify(req.body));
  res.end('Deleted, yo.\n');
});

var port = process.env.PORT || 4000;
var host = 'localhost';

app.listen(port, host, () => {
  console.log(`Listening at: http://${host}:${port}`);
});
