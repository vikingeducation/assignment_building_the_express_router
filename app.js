const express = require('./lib/express');
const port = 3001;
const app = express();

app.get('/', (req, res) => {
  res.end('Hi world!\n');
});

app.get('/foo', (req, res) => {
  res.end('You accessed foo!!\n');
});

app.listen(port, () => {
  console.log(`Listening on ${ port }`);
});