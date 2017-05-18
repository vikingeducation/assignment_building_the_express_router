const express = require('./lib/express');
const port = 3001;
const app = express();

app.get('/', (req, res) => {
  res.end('Hi world!\n');
});

app.get('/foo', (req, res) => {
  res.end('You accessed foo!!\n');
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.end('You accessed the root url with post!\n');
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

app.put('/testput', (req, res) => {
  res.end('You successfully accessed /testput using a put method!');
});

app.patch('/testpatch', (req, res) => {
  res.end('You successfully accessed /testpatch using a patch method!');
});

app.delete('/testdelete', (req, res) => {
  res.end('You successfully accessed /testdelete using a delete method!');
});

app.all('/testall', (req, res) => {
  res.end('You successfully accessed /testall using the all method!');
});

app.listen(port, () => {
  console.log(`Listening on ${ port }`);
});