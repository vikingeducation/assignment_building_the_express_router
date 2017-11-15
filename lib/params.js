function requestParams(url = '/foo/:bar') {

    // regex
    // segments
    // param names

    const url = 'foo/1/fiz/2';
    const pattern = '/foo/:bar/fiz/:baz';
    const segments = pattern.split('/');

    const segmentsToRegex = segments => {
        let str = '^/';
        for (let i = 0; i < segments.length; i++) {
            let segment = segments[i];
            if (segment[0] === ':') {
                str += '([^\\/]+)';
            } else {
                str += segment;
            }
            str += '/';
            if (i === segments.length - 1) {
                str += "?";
            }
        }
        str += "$";
        const regex = new RegExp(str, 'gi');
        return regex;
    };

    const extractParamNames = segments => {
        //get names prefixed with :

    }
}



//construct capture groups to get URL
    
// /^foo$/ match exactly with foo. /^f.o$/


//capture groups
//match regex to registered URL

//take registered URL /user/id
//transform into regex. /user/Capture group for ID. Replace semicolon ID.
