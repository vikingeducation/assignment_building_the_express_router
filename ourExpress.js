var httpObj = require("http");
var path = '';
var app = {
  
  StartServer: function(port, host, callback) {
		//create server
		let server = httpObj.createServer(callback);

		server.listen(port, host, () => { 
			console.log(`Server running at http://${host}:${port}/${path}`);
		});

    return;
  },

  Get: function(newPath, callback) {
  	path = newPath;
    return;
  }
};

var GetApp = function() {
  return app;
};

let port = process.env.PORT || 4000;
let host = "localhost";

app.StartServer(port, host, (req, res) => {
	// console.log("yay!!!!!!!!")
	res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

app.Get('cat', () => {
	console.log('meow');
})
