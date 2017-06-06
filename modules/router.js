let url = require('url');
let parse = require('./path_parser');

let Router = {};

Router.routes = {};
Router.methods = ['get', 'post', 'delete', 'put', 'patch'];
Router.patterns = [];

//Get data from the requested objected and attach it to the requested object body
var extractPostData = (req, done) => {
    var body = '';
    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        req.body = body;
        done();
    });
}

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

    //If no match is found in routes for the requested URL path, then function matchPatterns will check if requested URL
    //matches any URL patterns that have parameters. 
    let results = Router.routes[method][requestedPath] || matchPatterns(requestedPath, method);

    //check if results has a value
    if (!isEmpty(results) || results != "") {
        //Promise to get POST data and when data retrievel is complete then resolve.
        let p = new Promise((resolve) => {
            if (method === 'post') {
                extractPostData(req, resolve);
            }
            //if method is get then just resolve
            else {
                resolve();
            }
        });

        p.then(() => {
            if(results['handler']) { //check if results is an object which has a key called 'handler' -- return value from calling matchPatterns(requestedPath, method)
            //assign the paramaters if any (paramaters being any path in  pattern url that contains colon before a word (:baz))
            req.params = results.params;
            //call the function(handler) for the specific matched path
            results['handler'](req, res);
            }
            else{
                results(req,res);
            }
        });
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
    console.log(result);
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

