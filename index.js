let express = require('./lib/express');
let app = express;

app.listen(3000, 'localhost')
app.get('/', function(res){
  console.log("it worked")
})

