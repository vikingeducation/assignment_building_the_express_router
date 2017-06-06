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

    app.post = (path, callback) => {
        router.post(path, callback);
    }

    app.put = (path, callback) => {
        router.put(path, callback);
    }

    app.delete = (path, callback) => {
        router.delete(path, callback);
    }

    app.patch = (path, callback) => {
        router.patch(path, callback);
    }

    return app;

}

module.exports = createExpress;

