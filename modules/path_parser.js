let url = require('url');

const userURL = url.parse('http://localhost:4000/foo/2/bar/cookies').pathname; //
const getUrl =  '/foo/:baz/bar/:poo';

const reqURL = userURL.split('/');
const patternUrl = getUrl.split('/');

let paramVar = /:(.+)/;


let results = [{}];

let removeColon = (elemet) => {
   return elemet.replace(/[^a-zA-Z]/g,"");
}


//only proceed if length of both request url path and pattern path are the same
if (reqURL.length == patternUrl.length) {

    results[0]['path'] = getUrl;

    //iterate of the split array string
    for (let i = 0; i < reqURL.length; i++) {
        
        
        //check to see if current element (string) has is considered a url parameter by doing
        //a regex test.. testing for occurance of :(colon) and any word after it.
        //if so store as object.. url parameter being key.
        if(paramVar.test(patternUrl[i])){
            results[0][removeColon(patternUrl[i])] = reqURL[i];
            continue;
        }

        //if any one of elements both the URLs mismatch then break out and empty the results object;
        if(patternUrl[i] != reqURL[i]){
           console.log('not right URL');
           results = "";
           console.log(results);
           break;
        }
    }


    console.log(results);
}

else {
    console.log('Doesnt not match');
}
