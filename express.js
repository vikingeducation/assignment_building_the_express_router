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
            let paths = Object.keys(routes.get);
            let found = false;
            let pathsLength = paths.length;
            let index = 0;
            while(!found && index < pathsLength) {
                var regex = new RegExp(paths[index], 'gi');
                var match = regex.exec(req.url);
                if (match) {
                    routes.get[paths[index]].callback(req, res);
                    found = true;
                    console.log('match ' + match);
                    console.log('paths index ' + paths[index]);


                }
                index++;
            }
            //If no matches
            if (!found) {
                res.statusCode = 404;
                res.end("Not found");
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

    return {
        'listen': listen,
        'get': get
    };
    
}










module.exports = ExpressRouter;