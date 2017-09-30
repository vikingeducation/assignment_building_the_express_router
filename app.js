const express = require('./lib/express');

const app = express();

app.get('/', (req, res) => {
  res.end('Hi world!\n');
});

app.get('/foo/:bar/', (req, res) => {
  const params = JSON.stringify(req.params);
  res.end(`your params are ${params}!\n`);
});

app.get('/foo/:bar/biz/:baz', (req, res) => {
  const params = JSON.stringify(req.params);
  res.end(`You accessed /foo/:bar/biz/:baz and your params are ${params}!\n`);
});

const port = process.env.PORT || 4000;
const host = 'localhost';

app.listen(port, () => {
  console.log(`Listening at: http://${host}:${port}`);
});
