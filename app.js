// 1. Require Express
var express = require('./lib/router/myexpress');

// 2. Create an application with the
// returned function
var app = express();

// 3. Create routes via the app object
app.get('/', (req, res) => {
  console.log(req);
  res.end('Hi world!\n');
});

app.post('/foo/:bar/fiz', (req, res) => {
  res.write(req.body);
  res.end('\nHi my POST!\n');
});

app.put('/foo/:bar/fiz', (req, res) => {
  res.write(req.body);
  res.end('\nHi my PUT!\n');
});

app.patch('/foo/:bar/fiz', (req, res) => {
  res.write(req.body);
  res.end('\nHi my PATCH!\n');
});

app.delete('/foo/:bar/fiz', (req, res) => {
  res.write(req.body);
  res.end('\nHi my DELETE!\n');
});

// 4. Start up a server with app.listen
var port = process.env.PORT || 4000;
var host = 'localhost';

app.listen(port, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});
