// 1. Require Express
const express = require('./lib/express');

// 2. Create an application with the
// returned function
const app = express();

// 3. Create routes via the app object
// GET
// go to localhost:4000/ 
app.get('/', (req, res) => {
  res.end('Hello Express Router!\n');
});

// go to localhost:4000/foo/1/fiz/31/foe/91
app.get('/foo/:bar/fiz/:baz/foe/:boop', (req, res) => {
  res.end(` 
  	{ bar: ${req.params['bar']} }, 
  	{ baz: ${req.params['baz']} }, 
  	{ boop: ${req.params['boop']} }!`);
});

// go to localhost:4000/username/maddie/password/1234
app.get('/username/:uname/password/:pword', (req, res) => {
  res.end(`Hello ${req.params['uname']}, your password is ${req.params['pword']}!`);
});


// command line: `curl -X PATCH/PUT/PATCH/DELETE -d "foo: bar" http://localhost:4000`
// POST
app.post('/', (req, res) => {
  let data = req.body;

  // If the content type is JSON
  // parse the data into a JSON string
  if (req.headers['content-type'] === 'application/json') {
    data = JSON.parse(req.body);
    data = JSON.stringify(data, null, '  ');
  }

  // Output the data
  res.end(`Post Data: ${ data }\n`);
});

// PUT
app.put('/', (req, res) => {
  let data = req.body;

  if (req.headers['content-type'] === 'application/json') {
    data = JSON.parse(req.body);
    data = JSON.stringify(data, null, '  ');
  }

  res.end(`Put Data: ${ data }\n`);
});

// PATCH
app.patch('/', (req, res) => {
  let data = req.body;

  if (req.headers['content-type'] === 'application/json') {
    data = JSON.parse(req.body);
    data = JSON.stringify(data, null, '  ');
  }

  res.end(`Patch Data: ${ data }\n`);
});

app.delete('/', (req, res) => {
  res.end('Goodbye Express Router!\n');
});



// 4. Start up a server with app.listen
const port = process.env.PORT || 4000;
const host = 'localhost';

app.listen(port, host, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});