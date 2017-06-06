let url = require('url');


let paramVar = /:(.+)/;


let results = {};

let removeColon = (elemet) => {
    return elemet.replace(/[^a-zA-Z]/g, "");
}


let parse = (requestedURL, passedPattern, handler) => {
    let requestedPath = requestedURL.split('/');
    let patternUrl = passedPattern.split('/');

    results = {};

    //only proceed if length of both request url path and pattern path are the same
    if (requestedPath.length == patternUrl.length) {
        results.params = {}
        //iterate of the split array string
        for (let i = 0; i < requestedPath.length; i++) {
            
            
            //check to see if current element (string) has is considered a url parameter by doing
            //a regex test.. testing for occurance of :(colon) and any word after it.
            //if so store as object.. url parameter being key.
            if (paramVar.test(patternUrl[i])) {
                results.params[removeColon(patternUrl[i])] = requestedPath[i];
                continue;
            }

            //if any one of elements in both of the URLs mismatch then return empty results object;
            if (patternUrl[i] != requestedPath[i]) {
                return results = {};
                
            }
        }

        //If the pattern URL matched the requested URL, then assign the passed in callback that matched the patternURL,
        //to be called in Router.routeHandler. 
        results['handler'] = handler;
        return results;
    }

    else {
        //If nothing matched
        return results = {}; //return empty results
    }

}

module.exports = parse;

