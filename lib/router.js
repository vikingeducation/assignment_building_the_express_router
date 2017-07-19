const url = require('url');


// Private method to extract POST
// data from a request
// Calls done() to resolve the wrapping
// promise when finished
// var _extractPostData = (req, done) => {
//   var body = '';
//   req.on('data', (data) => {
//     body += data;
//   });
//   req.on('end', () => {
//     req.body = body;
//     done();
//   });
// };
//
// let p = new Promise((resolve, reject) => {
//   if(method !== get) {
//     extractPostData(req, resolve());
//   }
//
// })

const Router = {};

Router.methods = [
  'post',
  'get'
];

Router.routes = {};

Router.methods.forEach((method) => {
  Router.routes[method] = {};

  Router[method] = (path, callback) => {
    Router.routes[method][path] = callback;
  }
});

Router.handle = (req, res) => {
  // Obtain the method from the request object
  let method = req.method.toLowerCase();


  // Get the path from the request object
  let path = url.parse(req.url).pathname;

  // This is where we make the routes dynamically
  if(Router.routes[method][path] !== undefined) {
    let p = new Promise((resolve, reject) => {
      if(Router.methods.includes(method)) {
        switch (method) {

          case 'post':
            // REMEMBER TO FIGURE THIS OUT LATER
            break;
          default:
            resolve();

        }

        }
      } else {
        reject("Something went wrong!!");
      }
    })

    Router.routes[method][path](req, res);
  }
}
