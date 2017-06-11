// 1. Require Express
var express = require('./lib/express');

// 2. Create an application with the
// returned function
var app = express();

// 3. Create routes via the app object
app.get('/', (req, res) => {
  // console.log(req);
  res.end('Hi world!\n');
});

// app.get('/test', (req, res) => {
//   console.log(req);
//   res.end('Test page\n');
// });
//
// app.get('/test2', (req, rest) => {
//   console.log(req);
//   res.end('Test page 2\n');
// });

//register parametrized route
app.get('/foo/:bar', (req, res) => {
  // console.log(req);
  console.log(req.params);
  res.end('Parametrized route\n');
});

app.get('/foo/:bar/fiz/:baz', (req, res) => {
  console.log(req.params);
  res.end('Another parametrized route\n');
});

app.post('/', (req, res) => {
  console.log(req.params);
  res.end('A POST route');
})

// 4. Start up a server with app.listen
var port = process.env.PORT || 4000;
var host = 'localhost';

app.listen(port, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});
