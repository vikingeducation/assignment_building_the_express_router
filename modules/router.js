let url = require('url');
let parse = require('./path_parser');

let Router = {};

Router.routes = {};
Router.methods = ['get', 'post'];
Router.patterns = [];


//When get or post is called, store the path and callback to that verb in Router.routes. 
//ex: Router.routes.get./(callback);
Router.methods.forEach((method) => {
    Router.routes[method] = Router.routes[method] || {};

    Router[method] = (path, callback) => {
        Router.patterns.push(path);
        Router.routes[method][path] = callback;
    };
});

Router.routeHandler = (req,res) => {
    const method = req.method.toLowerCase();
    const requestedPath = url.parse(req.url).pathname;
 
    req.params = {};
    //pass path to parse. Parse the url and find the matching pattern
    let results = matchPatterns(requestedPath, method);

    if(!isEmpty(results)){
      req.params = results[0];
      results[1](req,res);  
      console.log(results);   

    }
    else{
        res.statusCode = 404;   
        console.log(results);  
        res.end('404 not found');
    }


};

let matchPatterns = (requestedPath, method) =>{
    let result = {};
    
    for(let i = 0; i<Router.patterns.length; i++){
        if(!isEmpty(result)) break;

        result[0] = parse(requestedPath, Router.patterns[i]);
        result[1] = Router.routes[method][Router.patterns[i]]; //change this.. the handler is always of the first one
    }
    return result;
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = Router;

