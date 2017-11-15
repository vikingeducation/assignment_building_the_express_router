const Router = require('./router.js');
const http = require('http');

    class app {
    	constructor(){

	this.get = (path, callback) =>{
		Router.routes.get.path;		
	},

	this.listen = (...args) => {

		let server = http.createServer(args[1]);
		server.listen(args);
	}
};		
}

  express = function(){
  	constructor(){
 	return new app()
 }
 };

module.export = express;