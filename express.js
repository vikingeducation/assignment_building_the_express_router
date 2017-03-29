"use strict";

let http = require("http");


function ExpressRouter() {
    
    let routes = {};
    
    // router.get = {};
    // routes.post = {};
    
    

    function listen(...args) {
        let server = http.createServer(...args);
        server.listen(...args);
    }
    
    function get(path, callback) {
        //Pass path and callback to routes property
    }

    return {
        'listen': listen,
        'get': get
    };
    
}










module.exports = ExpressRouter;