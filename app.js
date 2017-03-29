// 1. Require Express
var express = require('./lib/our_express');

// 2. Create an application with the
// returned function
var app = express();

// 3. Create routes via the app object
app.get('/', (req, res) => {
  console.log(req.params);
  res.end('Hi world!\n');
});

app.get('/users/:user/profile/:setting', (req, res) => {
  let user = req.params[':user'];
  let setting = req.params[':setting'];
  res.end(`Hello ${user}, you are in the ${setting} page!`);
});


// 4. Start up a server with app.listen
var port = process.env.PORT || 4000;
var host = 'localhost';

app.listen(port, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});