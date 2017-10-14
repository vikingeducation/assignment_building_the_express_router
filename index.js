'use strict';

// 1. Require Express
const express = require('./lib/express');

// 2. Create an application with the returned function
const app = express();

// 3. Create routes via the app object
app.get('/', (req, res) => {
  res.end('DC: Hello Express Router!\n');
});

// 4. Start up a server with app.listen
let port = process.env.PORT || 4000;
let host = 'localhost';

app.listen(port, host, () => {
  console.log(`Listening at: http://${ host }:${ port }/`);
});
