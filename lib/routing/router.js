'use strict';

// Require libraries.

const patterns = require('./router_patterns');
const _extractPostData = require('./util/extract_post_data');
const _extractUrlParams = require('./util/extract_url_params');
const router = {};

// Supported HTTP methods.
router.methods = [
  'post',
  'get',
  'put',
  'patch',
  'delete'
];

// Template function for router
router.routes = {};
router.methods.forEach((method) => {
  router.routes[method] = {};

  router[method] = (path, callback) => {
    router.routes[method][path] = callback;
  }
});

// Handler that actually processes requests and routes
// them to the correct method in our express app.
router.handle = (req, res) => {
  let method = req.method.toLowerCase();

  // Module coolness.
  let routeIndex = _extractUrlParams(req, router.routes, patterns);
  console.log(`routeIndex: ${routeIndex}`);
  // This is where we make the routes dynamically
  if(routeIndex !== null && router.routes[method][routeIndex] !== undefined) {

    let p = new Promise((resolve, reject) => {
			// Make sure the method being requested is supported.
      if(router.methods.includes(method)) {
        switch (method) {
          case 'post':
          case 'patch':
          case 'put':
          case 'post':
          case 'delete':
            _extractPostData(req, resolve);
            break;
          default:
            resolve();
        }
      } else {
        reject("Something went wrong!!");
      }
    });

		// Handle promise resolving and rejection.
		p.then(() => {
			router.routes[method][routeIndex](req, res);
		}, result => {
			if (typeof result === 'string') {
				console.error(result);
			}
			res.statusCode = 404;
			res.end('404 Not Found, dude!');
		});
  } else {
    res.statusCode = 404;
    res.end('404 Not Found, dude!');
  }
}

module.exports = router;
