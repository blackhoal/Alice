const { a, b } = require("./sample");

a.sayA();
b.sayB();

// 위는 아래와 같다
// const sample = require("./sample");

// sample.a.sayA();
// sample.b.sayB();

const fs = require("node:fs");
const test = require("./test.json");

console.log("require로 읽어온 json 파일");
console.log(test);

// fs로 파일을 읽으면 일반 string으로 읽어온다.
const testString = fs.readFileSync("./test.json", "utf8");

console.log("fs로 읽어온 json파일");
console.log(testString);
// JSON.parse로 해주어야 JS의 객체로 다룰 수 있다.
console.log(JSON.parse(testString));
