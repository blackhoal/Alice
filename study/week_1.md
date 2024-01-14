# 자바스크립트 함수의 실행 과정
- 자바스크립트 엔진은 코드가 없어도 실행 환경(실행 컨텍스트)을 초기화
- 스코프(Scope) : 코드가 현재 실행되는 환경, 맥락(context)
- 종류 : this 포인터, 스코프에 저장된 변수, 스코프 체인
    - 글로벌 스코프에서는 this 포인터가 window를 지칭
- 함수가 실행 시 함수 스코프에 따라 환경이 형성
    - this, 함수 스코프 내의 변수, 스코프 체인이 형성
    - 스코프 체인에 따라 글로벌 환경에 도달
- 객체의 메서드 환경에서의 this는 해당 객체를 지칭
    - 환경에 따라 변경 가능

# 실행 컨텍스트
- 자바스크립트 코드가 실행되는 환경
- 코드에서 참조하는 변수, 객체(함수 포함), this 등에 대한 참조가 존재
- 전역에서 시작하여 함수가 호출 시 스택에 누적
- 전역 실행 컨텍스트 : 자바스크립트가 실행될 때 생성
- 함수 실행 컨텍스트 : 함수가 실행될 때 생성

# this
```js
functionmyFunc() {
    console.log('myFunc called')
}

// ⓐ 함수 호출
myFunc() 

const o= {
    name: 'Daniel',
    printName: function() { 
        console.log(this.name) 
    }
}
        
// ⓑ 메서드 호출
o.printName() 

functionPerson(name) {
    this.name= name
    this.printName= function() { 
        console.log(this.name) 
    }
}

// ⓒ 생성자 호출
const p = newPerson('Daniel')

// ⓓ 간접 호출
setTimeout(p.printName.bind(p), 1000) 
```
- 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수
- 동적 바인딩 : 함수를 호출 시 함수의 호출 환경(함수가 어떻게 호출되었는지)에 따라 this에 바인딩할 객체가 동적으로 결정
- bind, apply, call 등을 통해 this에 대한 바인딩 조작 가능
- 함수가 호출되는 상황 4가지
    - ⓐ 함수 호출 : 함수를 직접 호출
    - ⓑ 메서드 호출 : 객체의 메서드를 직접 호출
    - ⓒ 생성자 호출 : 생성자 함수를 호출
    - ⓓ 간접 호출 : call, apply 등으로 함수를 간접 호출

# 콜백 함수
```js
function myFunc(name, callbackFunc) {
    const sentence = `안녕하세요 저는 ${name}입니다.`
    
    // 매개변수의 함수(콜백 함수)를 호출
    callbackFunc(sentence)
}

myFunc("Jason", function nameFunc(name) {
    // 안녕하세요 저는 Jason입니다.
	console.log(name)
})
```
- 매개변수로 함수 객체를 전달하여 호출한 함수 내에서 매개변수 함수를 실행하는 것
- 파라미터로 일반적인 변수나 값이 아닌 함수 자체를 전달
- 일회성으로 사용하므로 보통 콜백 함수의 인자로 함수를 전달 시 이름이 없는 익명의 함수로 전달

# 화살표 함수
```js
// 방법 1
function sum(a, b) {
  return a + b;
}

// 방법 2
let sum = (a, b) => {
	return a + b;
}

// 방법 3
const sum = (a, b) => a + b;
```
- 기존의 함수 표현식보다 좀 더 간결하며 쉽게 사용하기 위해 ES6에 고안된 표현식
- 기존의 함수 표현식에서 function 키워드를 삭제하고 인자를 받는 매개변수와 코드 블록 사이에 화살표를 삽입하여 작성
- 특징
    - this가 존재 X
        - 화살표 함수에서 this 키워드로 접근 시 자신이 아닌 외부에서 값을 전달
    - arguments 객체를 보유 X
        - arguments : 일반 함수가 호출 시 전달된 인수를 담고 있는 유사 배열 객체
        - 나머지 매개변수 문법(...args)을 통해 인수를 배열로 받는 것이 가능
    - 생성자 함수가 X
        - 객체를 생성하는 용도로 사용 불가하며 보통 콜백 함수나 익명 함수로 사용

# 클로저
```js
/*
    1. ​함수 outerFunc 내 에서 내부 함수 innerFunc가 선언 및 호출
    2. 내부 함수 innerFunc는 자신을 포함하는 외부 함수 outerFunc의 변수 x에 접근 가능
    3. 이는 함수 innerFunc가 함수 outerFunc의 내부에 선언되었기 때문이다.
*/
function outerFunc() {
    var x = 10;
    var innerFunc = function () { 
        console.log(x); 
    };
    innerFunc();
}

outerFunc();
```
- 외부 변수를 기억하고 이 외부 변수에 접근 가능한 함수
- 반환된 내부 함수가 자신이 선언됐을 때의 환경(Lexical environment)인 스코프를 기억하여 만일 자신이 선언됐을 때의 환경 밖에서 호출되어도 스코프에 접근 가능한 함수
- 함수의 일급 객체 성질을 이용하여 함수가 생성 시, 함수 내에서 사용되는 변수가 외부에 존재하는 경우 해당 변수들을 함수의 스코프에 저장
    - 함수를 다른 함수의 인자로 넘길 시, 다른 함수 내부에서 해당 함수를 호출 가능
    - 함수 내에 함수를 생성 시, 리턴을 통해 해당 함수를 외부에서 사용 가능
    - 함수의 실행이 끝나도 내부 변수를 유지 가능(함수 내에 클로저가 생성 시 내부 변수가 메모리에 남아 클로저에 활용)
- 활용
    - ⓐ 상태 유지
        - 현재 상태를 기억하고 이 상태가 변경되어도 최신 상태를 유지해야 하는 상황에 매우 유용
    - ⓑ 전역 변수의 사용 억제
        - 만약 자바스크립트에서 클로저가 없을 경우 상태를 유지하기 위해 전역 변수의 사용이 필요
        - 그러나 전역 변수는 누구나 접근 및 변경이 가능하므로 많은 부작용을 유발하여 오류의 원인이 되므로 사용을 지양
        - 전역 변수가 아닌 클로저를 사용 시 의도하지 않은 접근으로 인한 변경이 불가능하므로 안정적인 프로그래밍 가능

# 나머지 매개변수(Rest Parameter) / 스프레드 연산자(Spread Operator)
```js
// 1. Rest Parameter
function numbers(a, b, ...rest) {
	console.log(a);
 	console.log(b);
 	console.log(rest);
}

numbers(1, 2, 3, 4, 5);
/*
    console.log(a) => 1
    console.log(b) => 2
    console.log(rest) => [3, 4, 5]
*/

// 2. 객체에서의 Spread Operator
const user = { name: 'Kim', city: 'Seoul' };

user = { ...user, age: 28 };
console.log (user); // { name: 'Kim', city: 'Seoul', age: 28 }

user = { ...user, name: 'John', age: 30 }
console.log(user); // { name: 'John', city: 'Seoul', age: 30 }

// 3. 배열에서의 Spread Operator
const fruitOne = ['apple', 'banana'];
const fruitTwo = ['grape', 'peach'];

/* 3-1. 기존 방법 */
var fruitAll = fruitOne.concat(fruitTwo);

console.log(fruitAll); // ['apple', 'banana', 'grape', 'peach']

/* 3-2. Spread Operator 활용 */
const fruitAll = [...fruitOne, ...fruitTwo];

console.log(fruitAll); // ['apple', 'banana', 'grape', 'peach']
```
- Rest Parameter를 사용 시 함수의 파라미터에서 뒤의 남는 요소들을 배열로 받는 것이 가능
- Spread Operator를 사용 시 기존 배열이나 객체의 전체 또는 일부를 다른 배열이나 객체로 빠르게 복사하여 사용 가능

# 자바스크립트 호이스팅(Hoisting)
```js
console.log(a()); // 'a'
console.log(b()); // Uncaught TypeError: b is not a function
console.log(c()); // Uncaught TypeError: b is not a function
 
function a() {
    return 'a';
}
 
var b = function bb() {
    return 'bb';
}
 
var c = function() {
    return 'c';
}

/* Lexical Environment */
lexicalEnvironment = {
    // 1. 선언(Declaration)
    a: uninitialized
    // 2. 초기화(Initialization)
    a: undefined
    // 3. 할당(Assignment)
    a: 10
}
```
```js
/* 함수 호이스팅 */
console.log(add(2, 3));   //  5
console.log(add_2(2, 3)); // error

// 함수 선언식
function add(x, y) {
    return x + y; 
}

// 함수 표현식 - 함수를 변수에 할당하므로 유연성이 높으며 호이스팅이 강제되지 않아 권장
var add_2 = function (x, y) {
    return x + y;
}
 
console.log(add(3, 4));   // 7
console.log(add_2(3, 4)); // 7

/* 변수 호이스팅 */
var globalNum = 10;            // globalNum을 전역 변수로 선언

function printNum() {
    // var globalNum; -> globalNum이 전역 변수로 선언했음에도 함수 호이스팅에 의해 함수의 맨 위로 이동
    document.write(globalNum); // undefined
    var globalNum = 20;        // globalNum을 지역 변수로 선언
    document.write(globalNum); // 20
}

printNum();
```
- 함수 내의 변수 및 함수 선언을 각 유효 범위의 최상단으로 끌어 올리는 자바스크립트의 독특한 특징
    - 실제로 끌어올려지는 것은 아니며 자바스크립트 parser가 내부적으로 끌어올려서 처리
- 호이스팅으로 인해 개발자가 어느 위치에 코드를 작성해도 실행 전 코드가 최상단으로 끌어올려진 후 실행
- 모든 선언(function, var, let, const 및 class)은 JavaScript에서 호이스팅이 발생
    - var : 선언 및 undefined로 초기화
    - let, const : 선언만 되며 초기화되지 않은 상태로 유지
- 자바스크립트의 변수 생성(Instantiation)과 초기화(Initialization)의 작업이 분리되므로 호이스팅이 발생
    - 컴파일 단계에서 코드 실행 전 함수 및 변수의 선언을 스캔
    - 자바스크립트 엔진은 코드를 실행 전 실행 컨텍스트를 위한 과정에서 모든 함수 및 변수 선언(var, let, const, function, class)은 렉시컬 환경(자바스크립트 데이터 구조) 내의 메모리에 등록
- 자바스크립트의 변수 생성 단계
    - 선언(Declaration) : 스코프와 변수 객체가 생성되며 스코프가 변수 객체를 참조
    - 초기화(Initialization) : 변수 객체 값을 위한 공간을 메모리에 할당(이 때 할당되는 값은 undefined)
    - 할당(Assignment) : 변수 객체에 값을 할당
- var / let / const
    - var : 선언과 동시에 초기화가 진행되어 undefined가 할당
    - let과 const : 선언만 되고 초기화가 진행되지 않아 메모리 할당이 아직 되지 않은 TDZ로 진입
    - TDZ(Temporal Dead Zone) : 변수 선언 및 초기화가 되기 전 사이의 일시적 사각지대
    - 따라서 var보다는 let & const의 사용을 권장

# Reference
[Inpa Dev 블로그](https://inpa.tistory.com/)  
