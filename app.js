// 1. Require Express
const express = require('./lib/express');

// 2. Create an application with the
// returned function
const app = express();

// 3. Create routes via the app object
app.get('/', (req, res) => {
  res.end('Hello Express Router!\n');
});

app.get('/foo/:bar/', (req, res) => {
  res.end(`Hi /foo/:bar/\n`);
});

app.get('/foo/:bar/fiz/:baz/', (req, res) => {
  res.end(`Hi /foo/:bar/foo/:biz/!\n`);
});

app.post('/', (req, res) => {
  let data = req.body;

  // If the content type is JSON
  // parse the data into a JSON string
  if (req.headers['content-type'] === 'application/json') {
    data = JSON.parse(req.body);
    data = JSON.stringify(data, null, '  ');
  }

  // Output the POST data
  res.end(`Data: ${ data }`);
});

// 4. Start up a server with app.listen
const port = process.env.PORT || 4000;
const host = 'localhost';

app.listen(port, host, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});