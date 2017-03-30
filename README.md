assignment_building_the_express_router
======================================
Will Whitworth David Hail
Build the core features of the Express router

/ 1. Require Express
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

express.js
    // Delegating Requests to a Router

    var http = require('http');
    var router = require('./lib/router');
    var routes = require('./routes');


    var port = process.env.PORT ||
    process.argv[2] ||
    3000;
    var host = 'localhost';


    // Delegate the server callback to the router
    var server = http.createServer(router.handle);


    server.listen(port, host, () => {
    console.log(`Listening: http://${ host }:${ port }`);
    });


  sub routes

      router
        simple version
      build server
