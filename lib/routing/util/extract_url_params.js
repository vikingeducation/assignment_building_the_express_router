'use strict';

// Require libraries.
const url = require('url');

module.exports = function _extractUrlParams(req, routes, patterns) {
	// Obtain the method from the request object
	let method = req.method.toLowerCase();

	// Get the path from the request object
	let path = url.parse(req.url).pathname;

	if(path.length > 1 && path[path.length - 1] === '/') {
		// trim down path
		path = path.slice(0, -1);
	}

	let templates = routes[method];
	if (templates !== undefined) {
		for (var key in patterns) {
			var regexObj = new RegExp(patterns[key],'g').exec(path);
			if (regexObj) {
				break;
			}
		}

		if (!regexObj) {
			return null;
		}

		req.params = {};
		Array.from(regexObj).forEach((el, idx) => {
			if (idx % 2 === 1)
				req.params[key.match(patterns[key])[idx+1]] = regexObj[idx];
		});

		return key;
	}
	
	return null;
}
