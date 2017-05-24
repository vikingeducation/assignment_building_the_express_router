let url = require('url');

let Router = {};

Router.routes = {
    'get' : { 
        '/' : (req, res) => res.end('GET /')
    }
};


Router.routeHandler = (req,res) => {
    const method = req.method.toLowerCase();
    const path = url.parse(req.url).pathname;

    if(Router.routes[method][path]){
       Router.routes[method][path](req,res);
    }
    else{
        res.statusCode = 404;
        res.end('404 not found');
    }


};

module.exports = Router;