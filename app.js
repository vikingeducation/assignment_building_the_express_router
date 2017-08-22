// 1. Require Express
var express = require('./lib/expressedByChuck');

// 2. Create an application with the
// returned function
var app = express();

// 3. Create routes via the app object
app.get('/', (req, res) => {
  res.end('Hi world!\n');
});

app.get('/yeah', (req, res) => {
  res.end('YEAH\n');
});

app.get('/:yeahh/:yup', (req, res) => {
  res.end('YEAHHHHHHHH\n');
});

app.get('/1/2', (req, res) => {
  res.end('YEA12121\n');
});

// 4. Start up a server with app.listen
var port = process.env.PORT || 4000;
var host = 'localhost';

app.listen(port, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});
