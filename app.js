const express = require('./src/express.js');
const app = express();




// register routes
app.get('/', (req, res) => {
  res.end('Hello World!');
});



app.listen(3000, () => {
  console.log('Listening on port 3000');
});
