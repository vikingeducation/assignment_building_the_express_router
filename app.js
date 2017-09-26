const express = require('./lib/express');

var app = express();

app.get('/', (req, res) => {
  // console.log(req);
  res.end('Hello from the get method!');
});

app.get('/foo/:id/bar/:secondId', (req, res) => {
  res.end(`Here are the params\nid: ${ req.params.id }, secondId: ${ req.params.secondId }`);
});

app.post('/', (req, res) => {
  res.write(req.body);
  res.end('\nHello from post request\n');
});

app.put('/', (req, res) => {
  res.write(req.body);
  res.end('\nHello from put request\n');
});

app.patch('/', (req, res) => {
  res.write(req.body);
  res.end('\nHello from patch request\n');
});

app.delete('/', (req, res) => {
  res.write(req.body);
  res.end('\nHello from delete request\n');
});

var port = process.env.PORT || 3000;
var host = 'localhost';

app.listen(port, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});
