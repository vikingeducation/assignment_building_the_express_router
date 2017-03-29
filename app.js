var express = require('./lib/our_express');
var app = express();


app.get('/', (req, res) => {
  res.end('Hi world!\n');
});

app.get('/users/:user/profile/:setting', (req, res) => {
  let user = req.params[':user'];
  let setting = req.params[':setting'];
  res.end(`Hello ${user}, you are in the ${setting} page!`);
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.end('Hi post!\n');
});



var port = process.env.PORT || 4000;
var host = 'localhost';

app.listen(port, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});