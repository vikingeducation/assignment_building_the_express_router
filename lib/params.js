function requestParams(url = '/foo/:bar') {
	//url should match /foo/1
	//make {bar: 1} object
	urlParams = url.split('/');
	
    let regex = new RegExp(`${UrlParams[0]}`([^\\]+));
	
    let matches = [];
    let output = [];
    while (regex.exec(matches)) {
		matches.push(output);
	}
    
    params = {
        urlParams[0]: output;
    }
    
    return params;
}


//capture groups
//match regex to registered URL

//take registered URL /user/id
//transform into regex. /user/Capture group for ID. Replace semicolon ID.
