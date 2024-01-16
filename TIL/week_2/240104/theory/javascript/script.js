// console.log('호출된 자바스크립트')


// 변수, data type

// var, let, const

// let year = 2024;
// const point = 2;
// // Number

// console.log(year);
// console.log(point);

// // String

// const pass = false;
// const pass2 = true;
// //Boolean 참과 거짓.

// const today = "목요일";

// let newText = today + " 코딩하는날";
// console.log(newText);

// javascript 
// data type ==> Number, String, Boolean
// 약타입의 언어 , 강타입의 언어.
// // c++, C , rust


let a = 30; // Number
let b = "2"; // String


let result = a + b;
console.log("덧셈결과: " + result);
// 약타입의 언어에서 오는 대표적인 오류
// 강타입의 언어에서는 다른 데이터 타입끼리의 결합이 불가능 합니다

//typeof => 데이터 타입이 어떤건지를 확인하는
console.log(typeof a);
console.log(typeof b);
console.log(typeof result);

// 서버 (백엔드) 와 클라이언트(프론트앤드) 통신을 하는 과정
// JSON 

let typeAdd = a + Number(b);
// 데이터의 형변환
console.log("형변환: " + typeAdd);

let str = "123abc";
let newNumber = parseInt(str);
console.log(newNumber);
console.log(typeof newNumber);
console.log(Number(str));

let numString = String(a);
console.log(typeof numString)
