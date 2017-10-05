const express = require('./lib/express');

const app = express();

app.get('/', (req, res) => {
  res.end('Hi world!\n');
});

app.get('/foo/:bar/', (req, res) => {
  const params = JSON.stringify(req.params);
  res.end(`Your parameters are ${params}\n`);
});

app.get('/foo/:bar/biz/:baz', (req, res) => {
  const params = JSON.stringify(req.params);
  res.end(`Your parameters are ${params}\n`);
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.end('POST request!\n');
});

app.put('/', (req, res) => {
  console.log(req.body);
  res.end('PUT request!\n');
});

app.patch('/', (req, res) => {
  console.log(req.body);
  res.end('PATCH request!\n');
});

app.delete('/', (req, res) => {
  console.log(req.body);
  res.end('DELETE request!\n');
});

const port = process.env.PORT || 4000;
const host = 'localhost';

app.listen(port, () => {
  console.log(`Listening at: http://${host}:${port}`);
});
