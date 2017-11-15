var Router = {};

Router.handle = (req, res) => {
  res.end("hello from router");
};

Router.methods={
  'get':{},
  'post':{}
}

Router.methods.forEach((method)=>{
  Router.routes[method]= Router.routes[method] || {};
  Router[method] = (path, callback){
    Router.routes[method][path] = callback;
  };
})

module.exports = Router;
