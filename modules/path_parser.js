let url = require('url');


let paramVar = /:(.+)/;


let results = {};

let removeColon = (elemet) => {
    return elemet.replace(/[^a-zA-Z]/g, "");
}


let parse = (requestedURL, passedPattern) => {
    let requestedPath = requestedURL.split('/');
    let patternUrl = passedPattern.split('/');
    results = {};

    //only proceed if length of both request url path and pattern path are the same
    if (requestedPath.length == patternUrl.length) {

        //iterate of the split array string
        for (let i = 0; i < requestedPath.length; i++) {


            //check to see if current element (string) has is considered a url parameter by doing
            //a regex test.. testing for occurance of :(colon) and any word after it.
            //if so store as object.. url parameter being key.
            if (paramVar.test(patternUrl[i])) {
                results[removeColon(patternUrl[i])] = requestedPath[i];
                continue;
            }

            //if any one of elements both the URLs mismatch then break out and empty the results object;
            if (patternUrl[i] != requestedPath[i]) {
                
                console.log(`not right URL: ${passedPattern} + ${requestedURL}`);
                results = "";
                console.log(results);
                break;
            }
        }
        return results;
    }

    else {
        return results; //return empty results
    }

}

module.exports = parse;

