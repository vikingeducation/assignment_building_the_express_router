const express = require('./lib');

var app = express();

app.get('/', (req, res) => {
  console.log('no params...\n');
  res.end('Hi world!\n');
});

app.get('/:name/:pet', (req, res) => {
  console.log('Two params!\n');
  res.write(JSON.stringify(req.params));
  res.end('Two params!!!!\n');
});

app.get('/:name/has/:pet/', (req, res) => {
  console.log('Two params surrounding a literal!\n');
  res.write(JSON.stringify(req.params));
  res.end('Two params surrounding a literal!!!!\n');
});

app.get(/^\/[a-zA-Z]{3}\d{3}$/, (req, res) => {
  console.log('Whoa! A Regex!\n');
  res.end('Whoa! A Regex!\n');
});

app.get('/:name', (req, res) => {
  console.log('One param!\n');
  res.write(JSON.stringify(req.params));
  res.end('One Param!!!!\n');
});

app.post('/', (req, res) => {
  console.log('We got posted!\n');
  console.log(JSON.stringify(req.body));
  res.write(JSON.stringify(req.body));
  res.end('Gone. Postal.\n');
});

app.put('/', (req, res) => {
  console.log('We, were put upon.\n');
  console.log(req.body);
  res.write(JSON.stringify(req.body));
  res.end('Put me down!\n');
});

app.patch('/', (req, res) => {
  console.log('Patch me in! I have the message!\n');
  console.log(req.body);
  res.write(JSON.stringify(req.body));
  res.end('Have you applied the patches?\n');
});

app.delete('/', (req, res) => {
  console.log('[This object intentionally left blank]\n');
  console.log(req.body);
  res.write(JSON.stringify(req.body));
  res.end('Deleted, yo.\n');
});

var port = process.env.PORT || 4000;
var host = 'localhost';

app.listen(port, host, () => {
  console.log(`Listening at: http://${host}:${port}`);
});
