const Router = require('./router.js');
const http = require('http');

app ()=> {
	get = (path, callback) =>{
		Router.routes.get.path;		
	},

	listen = (port, callback) => {
		let server = http.createServer(callback);
		server.listen(port, callback);
	}
};		


module.export = app();