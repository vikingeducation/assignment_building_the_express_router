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

app.get('/:name', (req, res) => {
  res.write(JSON.stringify(req.params));
  console.log('One param!');
  res.end('One Param!!!!');
});

app.post('/', (req, res) => {
  console.log('We got posted!');
  res.write(JSON.stringify(req.body));
  console.log(JSON.stringify(req.body));
  res.end('Gone. Postal.');
});

var port = process.env.PORT || 4000;
var host = 'localhost';

app.listen(port, host, () => {
  console.log(`Listening at: http://${host}:${port}`);
});
