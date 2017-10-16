'use strict';

const parser = {

	objectHasContent: (obj) => {
	    for(let key in obj) {
	        if(obj.hasOwnProperty(key))
	            return true;
	    }
	    return false;
	},

	arrayHasContent: (array) => {
		return (array.length > 0);
	},

	extract: (path) => {
		let newPath = [];
		newPath = path.split('/');
		newPath.shift();
		return newPath;
	},

	parse: (path) => {
		let names = [];
		let params = [];
		let matches = path.split('/');
		
		matches.forEach( match => {
			if (match[0] === ':') {         	// found paramter path element, ie, :bar
				params.push(match.slice(1));	// params stores array of parameters, eg, ['bar', 'baz']
				names.push('([^/]+)');      	// thus push regex matcher 
			} else {							// found "normal" (non-parameter) path element, ie, foo
				names.push(match);          	// thus just push in normal path element
			}
		});

		let pattern = names.join('/');

		//given this url = http://localhost:4000/foo/1/fiz/2
		//pattern = /foo/([^/]+)/fiz/([^/]+)
		//params = [ 'bar', 'baz' ]
		  
		return {
			pattern: pattern,
			params: params
		};
	},

	match: (routes, path) => {
		let pattern, names, values;
		let num = 0;
		let patterns = Object.keys(routes);

		for (let item in patterns) {
			let regex = new RegExp(patterns[num], 'gi'); 
			let match = regex.exec(path);           

			if (match && (match[0] === path)) {
				pattern = patterns[num];
				names = routes[pattern].paramNames;
				values = match.slice(1);
				break;
			}
			num++;
		}

		//given this url = http://localhost:4000/foo/1/fiz/2
		//pattern = /foo/([^/]+)/fiz/([^/]+)
		//names = [ 'bar', 'baz' ]
		//values = [ '1', '2' ]

		return {
			pattern: pattern,
			names: names,
			values: values
		};	
	}
};

module.exports = parser;
