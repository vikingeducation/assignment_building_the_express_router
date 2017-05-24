let http = require('http');
let router = require('./router.js');

function createExpress (){
    let app = {};



    app.listen = (port, ...args) =>{
        const server = http.createServer(router.routeHandler);
        server.listen(port, ...args);

    }

    return app;

}

module.exports = createExpress;

