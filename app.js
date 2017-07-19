const express = require('./lib');

var app = express();

app.get('/', (req, res) => {
  console.log('no params...');
  // console.log(req);
  res.end('Hi world!\n');
});

app.get('/:name/:pet', (req, res) => {
  console.log('Two params!');
  res.end('Two params!!!!');
});

app.get('/:name', (req, res) => {
  console.log('One param!');
  res.end('One Param!!!!');
});

var port = process.env.PORT || 4000;
var host = 'localhost';

app.listen(port, host, () => {
  console.log(`Listening at: http://${host}:${port}`);
});
