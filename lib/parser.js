const pattern = '/foo/:bar/fiz/:bang/';
const path = '/foo/1';

let patternSplit = pattern.split('/');
patternSplit = patternSplit.filter(e => e.length > 0);
console.log(patternSplit);
let myArr = [];
patternSplit.forEach((subStr) => {
  if (subStr[0] === ':') {
    myArr.push('(.+)');
  } else {
    myArr.push(subStr);
  }
});
console.log(myArr);

// const second = splitPattern[1].slice(1, splitPattern[1].length);
// const regex = /`\/${first}\/${second}\/?`/;

const splitPath = path.split('/').splice(1, 2);
const foo = splitPath[0];
const bar = splitPath[1];
// const regex = /`\/${foo}\/${bar}\/?`/;

// console.log(first, second, foo, bar);
// console.log(regex.test(path));
