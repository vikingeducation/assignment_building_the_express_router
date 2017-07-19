'use strict';

const url = require('url');

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


  let templates = router.routes[method];
  if(templates !== undefined) {
    let regex = /\/(:?(\w+))/;
    var found = false;
    for(let template in templates) {
      if((found = template.match(regex)) !== null);
    }

    if(found === false) {
      res.statusCode = 404;
			res.end('404 Not Found, dude!');
    }

    // Make sure our literal path matches the regex as well.
    let literal = path.match(regex); // /mike
    console.log(found);
    console.log(literal);
    if (literal === null) {
      res.statusCode = 404;
      res.end('404 Not Found, dude!');
    }

    req.params = {};
    req.params[found[2]] = literal[2];
  }

  // This is where we make the routes dynamically
  if(router.routes[method][found[0]] !== undefined) {
    let p = new Promise((resolve, reject) => {
			// Make sure the mether being requested is supported.
      if(router.methods.includes(method)) {
        console.log('foo');
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

    router.routes[method][found[0]](req, res);
  }
}

module.exports = router;
