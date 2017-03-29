"use strict";

let http = require("http");


function ExpressRouter() {
    
    let routes = {};
    
    routes.get = {};
    routes.post = {};
    
    

    function listen(...args) {
        let server = http.createServer((req, res) => {
            console.log('url', req.url);
            if (routes.get[req.url]) {
                routes.get[req.url](req, res);
            } else {
                res.statusCode = 404;
                res.end("Not found");
            }
        });
        server.listen(...args);
    }
    
    function get(path, callback) {
        //Pass path and callback to routes property
        routes.get[path] = callback;
    }

    return {
        'listen': listen,
        'get': get
    };
    
}










module.exports = ExpressRouter;