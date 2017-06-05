var parser = require('./lib/parser');

var testPattern = '/foo/:bar/biz/:baz';
var testURL = '/foo/1/biz/2';
var testURL2 = '/foo/1/foo';

console.log('Should be true ' + parser.match(testURL, testPattern).isMatch);
console.log('Should be false ' + parser.match(testURL2, testPattern).isMatch);
