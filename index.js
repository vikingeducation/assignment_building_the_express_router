var express = require('./lib/express');
var app = express();

app.listen(3000, 'localhost');

app.get('/', (req, res) => {
  res.end('Hello routing file!');
});

app.get(/^fooba[r]+$/, (req, res) => {
  res.end('heyy');
});

app.get('/users/:id', (req, res) => {
  res.end('Hiyoo from the user ID page! User id is ' + req.params.id);
});

app.get('/users/:id/posts/:post_id', (req, res) => {
  res.end(
    'Heyoo from the posts page! User id is ' +
      req.params.id +
      ' and post id is ' +
      req.params.post_id
  );
});

app.post('/', (req, res) => {
  res.end(req.body);
});

app.put('/', (req, res) => {
  res.end('Put something');
});

app.patch('/users/:id', (req, res) => {
  res.end('Patch something');
});

app.delete('/users/:id', (req, res) => {
  res.end('Delete something');
});
