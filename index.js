let express = require('./lib/express');
let parse = require('./lib/pathParser');

let app = express();

app.listen(3000, 'localhost')

app.get('/', (req, res) => {
  res.end('Hi world!\n');
});

app.get('/users', (req, res) => {
  res.end('in the users route');
});

app.get('/users/:id', (req, res) => {
  res.end('in the id route');
});

// parse('localhost:3000/users/:id');
