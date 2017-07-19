

// 2. Create an application with the
// returned function
const app = app();

// 3. Create routes via the app object
app.get("/", (req, res) => {
  console.log(req);
  res.end("Hi world!\n");
});

// 4. Start up a server with app.listen
var port = process.env.PORT || 4000;
var host = "localhost";

app.listen(port, host, () => {
  console.log(`Listening at: http://${host}:${port}`);
});


module.exports = express