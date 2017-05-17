const express = require('./lib/express');
const port = 3001;
const app = express();

app.get('/', (req, res) => {
  res.end('Hi world!\n');
});

app.get('/foo', (req, res) => {
  res.end('You accessed foo!!\n');
});

app.get('/bar', (req, res) => {
  res.end('You accessed bar!!\n');
});

app.get('/foo/:bar/biz/:baz', (req, res) => {
  let params = JSON.stringify(req.params);
  res.end(`You accessed /foo/:bar/biz/:baz and your params are ${ params }!!\n`);
});

app.get('/foo/:sombrero', (req, res) => {
  let params = JSON.stringify(req.params);
  res.end(`You accessed foo/sombrero and your params are ${ params }!!\n`);
});

app.listen(port, () => {
  console.log(`Listening on ${ port }`);
});