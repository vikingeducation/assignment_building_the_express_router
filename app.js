// 1. Require Express
var express = require('./lib/express');

// 2. Create an application with the
// returned function
var app = express();

// 3. Create routes via the app object
app.get('/', (req, res) => {
  console.log(req);
  res.end('Hi world!\n');
});

// 4. Start up a server with app.listen
var port = process.env.PORT || 4000;
var host = 'localhost';

app.listen(port, host, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});
