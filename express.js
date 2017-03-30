"use strict";

let http = require("http");


function ExpressRouter() {
    
    let routes = {};
    
    routes.get = {};
    /*
    {
        'pattern1' { callback: callback,
            params: params
            }
        'pattern2', callback
    }
    */
    routes.post = {};
    
    

    function listen(...args) {
        let server = http.createServer((req, res) => {
            let method = req.method.toLowerCase();

            if (method === 'get') {

                let paths = Object.keys(routes.get);
                let found = false;
                let pathsLength = paths.length;
                let index = 0;

                while(!found && index < pathsLength) {
                    let regex = new RegExp(paths[index], 'gi');
                    let match = regex.exec(req.url);
                    req.params = {};
                    if (match) { //Add all route params to the req.params object
                        found = true;
                        // let p = new Promise(function (resolve, reject) {
                            
                        //     resolve(match[1]);
                        // });
                        // p.then(function onFulfilled(data) {
                            req.params[routes.get[paths[index]].params[0]] = match[1];
                            routes.get[paths[index]].callback(req, res);
                    //     }).catch(function rejected(err) {
                    //         throw err;
                    // });
                        }
                    index++;
                }
                if (!found) { //No matches, endpoint not found
                    res.statusCode = 404;
                    res.end("Not found");
                }
            } else if (method === 'post') {

                let paths = Object.keys(routes.post);
                let found = false;
                let pathsLength = paths.length;
                let index = 0;
                let p = new Promise(function (resolve, reject) {

                    while(!found && index < pathsLength) {
                        let regex = new RegExp(paths[index], 'gi');
                        let match = regex.exec(req.url);
                        req.body = {};
                        if (match) { //Add all route params to the req.params object
                            found = true;
                            // Initialize a string to concat
                            // the data
                                var body = [];
                                
                                
                                // Every time a data event is fired
                                // we concat the next chunk of data
                                // to the string
                                req.on('data', (data) => {
                                    body.push(data);
                                });
                                
                                // When the end event is fired
                                // we know we have all the data
                                // and can send back a response
                                req.on('end', () => {
                                    req.body = Buffer.concat(body).toString();
                                    resolve(index);
                                });
                        } else {
                            index++;
                        }
                    }
                    if (!found) { //No matches, endpoint not found
                        reject(404);
                    }
                });
                p.then(function onFulfilled(data) {
                        routes.post[paths[data]].callback(req, res); 
                    }, function onReject(err) {
                        res.statusCode = err;
                        res.end("Not found");
                })
                .catch(function errors(err) {
                        console.log(err); //Should just throw the error
                });
            }
        });
        server.listen(...args);
    }
    
    function get(path, callback) { //maybe we should save the matched regex somewhere?
        //Pass path and callback to routes property
        // path = /:foo
        // regex(path)
        // req.url = /egle
        //if the path matches a regex expression, we save that regex express.
        // when the server receives a request we check the url against the regex to find a match
        //
        //var path = '/path/:to/something/:else';

        var array = [];
        var paramsArray = [];
        var segments = path.split('/');
        segments.forEach((segment) => {
          if (segment[0] === ':') {
            array.push('([^\\/]+)');
            paramsArray.push(segment.slice(1));
          } else {
            array.push(segment);
          }
        });
        
        var pattern = array.join('/');
        //=> /path/([^\\/]+)/something/([^\\/]+)
        routes.get[pattern] = {};
        routes.get[pattern].callback = callback;
        routes.get[pattern].params = paramsArray;
    }

    function post(path, callback) { //maybe we should save the matched regex somewhere?
        //Pass path and callback to routes property
        // path = /:foo
        // regex(path)
        // req.url = /egle
        //if the path matches a regex expression, we save that regex express.
        // when the server receives a request we check the url against the regex to find a match
        //
        //var path = '/path/:to/something/:else';

        var array = [];
        var paramsArray = [];
        var segments = path.split('/');
        segments.forEach((segment) => {
          if (segment[0] === ':') {
            array.push('([^\\/]+)');
            paramsArray.push(segment.slice(1));
          } else {
            array.push(segment);
          }
        });
        
        var pattern = array.join('/');
        //=> /path/([^\\/]+)/something/([^\\/]+)
        routes.post[pattern] = {};
        routes.post[pattern].callback = callback;
        routes.post[pattern].params = paramsArray;
    }

    return {
        'listen': listen,
        'get': get,
        'post': post
    };
    
}










module.exports = ExpressRouter;