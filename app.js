// 1. Require Express
const express = require('./lib/express');

// 2. Create an application with the
// returned function
const app = express();

// 3. Create routes via the app object
app.get('/', (req, res) => {
  res.end('Hello Express!\n');
});

// 4. Start up a server with app.listen
const port = process.env.PORT || 4000;
const host = 'localhost';

app.listen(port, host, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});