let http = require('http');
let router = require('./router.js');

function createExpress (){ 
    let app = {};



    app.listen = (port, ...args) =>{
        const server = http.createServer(router.routeHandler);
        server.listen(port, ...args);

    }

    app.get = (path, callback) => {
        router.patterns.push(path);
        router.get(path, callback);
    };

    return app;

}

module.exports = createExpress;

