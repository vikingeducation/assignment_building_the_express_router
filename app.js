const express = require('./lib');

var app = express();

app.get('/', (req, res) => {
  console.log('no params...');
  res.end('Hi world!\n');
});

app.get('/:name/:pet', (req, res) => {
  res.write(JSON.stringify(req.params));
  console.log('Two params!');
  res.end('Two params!!!!');
});

app.get('/:name/has/:pet/', (req, res) => {
  res.write(JSON.stringify(req.params));
  console.log('Two params surrounding a literal!');
  res.end('Two params surrounding a literal!!!!');
});

app.get(/^[a-zA-Z]{3}\d{3}$/, (req, res) => {
  console.log('Whoa! A Regex!');
  res.end('Whoa! A Regex!');
});

app.get('/:name', (req, res) => {
  res.write(JSON.stringify(req.params));
  console.log('One param!');
  res.end('One Param!!!!');
});

app.post('/', (req, res) => {
  console.log('We got posted!\n');
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
