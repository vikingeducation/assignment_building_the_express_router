let http = require('http');
let express = require('./modules/express.js');

let app = express();


let port = process.env.PORT || process.argv[2] || 4000;
let host = "http://localhost";

app.listen(port, () => {
    console.log(`Listening at http://${host}:${port}`);
});
