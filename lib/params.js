function requestParams(url = '/foo/:bar') {
	//url should match /foo/1
	//extract bar
	//make {bar: 1} object
	urlParams = url.split('/');
	let query = urlParams[0];
	var regex = new RegExp(`${query}`);
	var matches,
		output = [];
	while ((matches = regex.exec(input))) {
		output.push(matches[1]);
	}
}

// result is in output here
