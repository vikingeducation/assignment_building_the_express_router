let url = require('url');

let Router = {};

Router.routes = {};
Router.methods = ['get', 'post'];

//When get or post is called, store the path and callback to that verb in Router.routes. 
//ex: Router.routes.get./(callback);
Router.methods.forEach((method) => {
    Router.routes[method] = Router.routes[method] || {};

    Router[method] = (path, callback) => {
        Router.routes[method][path] = callback;
    };
});

Router.routeHandler = (req,res) => {
    const method = req.method.toLowerCase();
    const path = url.parse(req.url).pathname;

    console.log(Router.routes[method][path]);

    if(Router.routes[method][path]){
       Router.routes[method][path](req,res);
    }
    else{
        res.statusCode = 404;
        res.end('404 not found');
    }


};

module.exports = Router;

