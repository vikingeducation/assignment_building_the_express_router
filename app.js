const express = require('./src/express.js');
const app = express();


// register routes
app.get('/', (req, res) => {
  res.end('Hello World!');
});

app.get('/foo/:bar', (req, res) => {
  res.end(`Param name bar has a value of ${req.params.bar}`)
});

app.get('/foo/:bar/fiz/:baz', (req, res) => {
  res.write(`Param name bar has a value of ${req.params.bar}\n`);
  res.end(`Param name baz has a value of ${req.params.baz}`);
});

app.post('/foo', (req, res) => {
  res.end('Got the post.\n');
});

app.post('/foo/:bar', (req, res) => {
  res.write(`Post data from req.body: ${req.body.fiz} \n`);
  res.end('Post with parameter.\n');
});

app.delete('/foo/:username', (req, res) => {
  const username = req.params.username;
  res.end(`Deleting username: ${username}`);
});

app.put('/foo', (req, res) => {
  res.write(`Data: ${req.body.fiz}`);
  res.end('Received put request.');
});

app.patch('/foo', (req, res) => {
  res.write(`Data: ${req.body.fiz}`);
  res.end('Received patch request');
});



app.listen(3000, () => {
  console.log('Listening on port 3000');
});
