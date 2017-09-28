const pattern = '/foo/:bar';
const path = '/foo/1';

const splitPattern = pattern.split('/').splice(1, 2);
const first = splitPattern[0];
const second = splitPattern[1].slice(1, splitPattern[1].length);
const regex = /`\/${first}\/${second}\/?`/;

const splitPath = path.split('/').splice(1, 2);
const foo = splitPath[0];
const bar = splitPath[1];
// const regex = /`\/${foo}\/${bar}\/?`/;

console.log(first, second, foo, bar);
console.log(regex.test(path));
