let http = require('http');
let express = require('./modules/express.js');
let router = require('./modules/router.js');
let app = express();


let port = process.env.PORT || process.argv[2] || 4000;
let host = "http://localhost";

app.listen(port, () => {
    console.log(`Listening at ${host}:${port}`);
});


app.get('/', (req, res) => {
    res.end('Home directory');
});

app.get('/baz/:foo', (req, res) => {
    res.end(`Hello from ${req.params.foo}`);
});

app.get('/bar/:boo/foo/:har', (req, res) => {
    res.end(`Hello from ${req.params.boo} and ${req.params.har}`);
});

app.post('/', (req,res) => {
    res.write('\n'+req.body);
    res.end('\nHello from POST request');
});