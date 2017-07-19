let express = require("./lib/express.js");

const app = express();
console.log(app);

app.get("/", (req, res) => {
   console.log(req);
   res.end("Hi world!\n");
});

var port = process.env.PORT || 3000;
var host = "localhost";

app.listen(port, host, () => {
  console.log(`Listening at: http://${host}:${port}`);
});

module.exports = express;
