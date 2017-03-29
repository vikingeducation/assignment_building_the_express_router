let express = require('./lib/express');
let app = express();

app.listen(3000, 'localhost')

app.get('/', (req, res) => {
  res.end('Hi world!\n');
});

app.get('/users', (req, res) => {
  res.end('in the users route');
});
