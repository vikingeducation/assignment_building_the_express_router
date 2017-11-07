var Router = {};

Router.methods =[
  'get',
  'post'
];

Router.routes = {};

Router.methods.forEach((method) => {
  Router.routes[method] = Router.routes[method] || {};

  Router[method] = (path, callback) => {
    Router.routes[method][path] = callback;
  }
})

module.exports = Router;
