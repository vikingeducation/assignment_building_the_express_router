'use strict';

const url = require('url');
const patterns = require('./regex/router_patterns');

// Private method to extract POST
// data from a request
// Calls done() to resolve the wrapping
// promise when finished
var _extractPostData = (req, done) => {
  var body = '';
  req.on('data', (data) => {
    body += data;
  });
  req.on('end', () => {
    req.body = body;
    done();
  });
};

const router = {};

router.methods = [
  'post',
  'get'
];

router.routes = {};

router.methods.forEach((method) => {
  router.routes[method] = {};

  router[method] = (path, callback) => {
    router.routes[method][path] = callback;
  }
});

router.handle = (req, res) => {
  // Obtain the method from the request object
  let method = req.method.toLowerCase();
  // /whatever

  // Get the path from the request object
  let path = url.parse(req.url).pathname;

  if(path.length > 1 && path[path.length - 1] === '/') {
    // trim down path
    path = path.slice(0, -1);
  }

  let templates = router.routes[method];
  if (templates !== undefined) {
    for (var key in patterns) {
      var regexObj = new RegExp(patterns[key],'g').exec(path);
      if (regexObj) {
        break;
      }
    }
  }

  req.params = {};
  Array.from(regexObj).forEach((el, idx) => {
    if (idx % 2 === 1)
      req.params[key.match(patterns[key])[idx+1]] = regexObj[idx];
  });

  // This is where we make the routes dynamically
  if(router.routes[method][key] !== undefined) {
    let p = new Promise((resolve, reject) => {
			// Make sure the mether being requested is supported.
      if(router.methods.includes(method)) {
        switch (method) {
          case 'post':
            _extractPostData(req, resolve)
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
			router.routes[method][path](req, res);
		}, result => {
			if (typeof result === 'string') {
				console.error(result);
			}
			res.statusCode = 404;
			res.end('404 Not Found, dude!');
		});

    router.routes[method][key](req, res);
  }
}

module.exports = router;
