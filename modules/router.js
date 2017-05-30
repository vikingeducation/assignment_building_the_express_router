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
        Router.routes[method][path] = callback;
    };
});


Router.routeHandler = (req, res) => {
    const method = req.method.toLowerCase();
    const requestedPath = url.parse(req.url).pathname;

    req.params = {};

    
    let results = matchPatterns(requestedPath, method);

    if (!isEmpty(results)) {
        //assign the paramaters if any (paramaters being any path in  pattern url that contains colon before a word (:baz))
        req.params = results.params;
        //call the function(handler) for the specific matched path
        results['handler'](req, res);

    }
    else {
        res.statusCode = 404;
        res.end('404 not found');
    }


};


//Go through the URL path patterns in the array and check it against the requestedURL
let matchPatterns = (requestedPath, method) => {
    let result;
    //loop through patterns array
    for (let i = 0; i < Router.patterns.length; i++) {
        //check is result is empty, if not empty we know there was a successful match
        if (!isEmpty(result)) break;

        else {
            //for each pattern in the patterns array, the callback (handler) for the specific pattern is also passed to the parse function
            let handler = Router.routes[method][Router.patterns[i]];
            result = parse(requestedPath, Router.patterns[i], handler);
        }

    }
    return result;
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = Router;

