const express = require('./lib/express');

const app = express();

app.get('/', (req, res) => {
  console.log(req);
  res.end('Hi world!\n');
});

const port = process.env.PORT || 4000;
const host = 'localhost';

app.listen(port, () => {
  console.log(`Listening at: http://${host}:${port}`);
});
