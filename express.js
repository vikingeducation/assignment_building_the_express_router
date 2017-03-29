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
            console.log('url', req.url);
            console.log('routes.get', routes.get);
            let method = req.method.toLowerCase();

            if (method === 'get') {

                let paths = Object.keys(routes.get);
                let found = false;
                let pathsLength = paths.length;
                let index = 0;

                while(!found && index < pathsLength) {
                    var regex = new RegExp(paths[index], 'gi');
                    var match = regex.exec(req.url);
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

                while(!found && index < pathsLength) {
                    var regex = new RegExp(paths[index], 'gi');
                    var match = regex.exec(req.url);
                    req.body = {};
                    if (match) { //Add all route params to the req.params object
                        found = true;
                        // Initialize a string to concat
                        // the data
                        let p = new Promise(function (resolve, reject) {
                            console.log("Promise started!");
                            var body = '';
                            
                            // Every time a data event is fired
                            // we concat the next chunk of data
                            // to the string
                            req.on('data', (data) => {
                                console.log("Got some data");
                            body += data;
                            });
                            
                            // When the end event is fired
                            // we know we have all the data
                            // and can send back a response
                            req.on('end', () => {
                             req.body = body;
                             resolve();
                             console.log("Finished getting data!");
                            });
                        });
                        p.then(function onFulfilled(data) {
                                    console.log('routes.post', routes.post);
                                    console.log('paths', paths);
                                    console.log('index', index);
                                    console.log('routes.post[paths[index]].callback', routes.post[paths[index]].callback);
                                    routes.post[paths[index]].callback(req, res);    
                                })
                        .catch(function errors(err) {
                            throw err;
                        });
                    }
                    index++;
                }
                if (!found) { //No matches, endpoint not found
                    res.statusCode = 404;
                    res.end("Not found");
                }

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
        console.log("function post making pattern:", routes.post[pattern]);
    }

    return {
        'listen': listen,
        'get': get,
        'post': post
    };
    
}










module.exports = ExpressRouter;