let ourExpress = require('./ourExpress');

let app = ourExpress();

app.get('/', (req, res) => {
	console.log('hi')
})

app.get('/cats', (req, res) => {
	console.log('cats')
})

let port = process.env.PORT || 4000;
let host = 'localhost';

app.listen(port, host, () => {
  console.log(`Listening at: http://${ host }:${ port }`);
});
