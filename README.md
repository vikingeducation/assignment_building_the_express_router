assignment_building_the_express_router
Build the core features of the Express router

Alex Willenbrink
Andre Senner

// 1. Require Express
var express = require('express');

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

app.listen(port, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});
>>>>>>> d0506ce91c450a7a6943c476a7d73a98a1ab2542
