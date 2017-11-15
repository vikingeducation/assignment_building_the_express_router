var express = require('./lib/express');
let app = express();
// 2. Create an application with the
// returned function
//var app = express();

// 3. Create routes via the app object
app.get('/', (req, res) => {
		console.log(req);
		res.end('Hi world!\n');
		});
app.get('/:name', (req, res)=>{
		console.log(req);
		console.log('works');
		res.end('It works!\n');
		});
// 4. Start up a server with app.listen
var port = process.env.PORT || 4000;
var host = 'localhost';

app.listen(port, () => {
		console.log(`Listening at: http://${ host }:${ port }`);
		});