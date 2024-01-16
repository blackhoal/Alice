# 1. 가변변수 VS 불변변수
|선언|재정의|재선언|
|:----:|:---:|:---:|
|var|O|O|
|let|O|X|
|const|X|X|

```js
let x = 2;
const y = 2;

// x = 4;
// y = 4;

document.write(x);
document.write('<br>');
document.write(y);
```

# 2. 모듈 내보내고 가져오기(import / export)
```js
// euro.js
function euroToWon(money) {
  var won = money * 1329.87;
  return won;
}

export default euroToWon;

// dollar.js
export function dollarToWon(money) {
  var won = money * 1224.5;
  return won;
}

// asia.js
function yuanToWon(money) {
  var won = money * 192.53;
  return won;
}

function yenToWon(money) {
  var won = money * 9.88;
  return won;
}

export { yuanToWon, yenToWon };

// index.js
import euroToWon from './exchange/euro.js';
import etw from './exchange/euro.js';
import { dollarToWon } from './exchange/dollar.js';
import { yuanToWon, yenToWon } from './exchange/asia.js';

```
```js
// 추가문제 currency.js
const DAILY_RATE = {
  eur: 1350,
  gbp: 1650,
  usd: 1250,
  jpy: 9.88,
  cny: 192.53,
};

/* 방법 1 */
export default function currencyExchange(money, currency) {
  const currencyRate = DAILY_RATE[currency];
  return currencyRate * money;
}

/* 방법 2 */
const currencyExchange = (money, currency) => {
  return money * DAILY_RATE[currency];
};

// index.js
import currencyExchange from './exchange/currency.js';

console.log(currencyExchange(200,'usd'))
```

# 3. 템플릿 리터럴(template literal)
```js
let learn = '자바스크립트';
let year = 3;

let sentence = `나는 ${learn}를 ${year}년째 공부중입니다.`;
document.write(sentence);

const DUMMY_ARRAY = new Array(1000).fill(0);
DUMMY_ARRAY.forEach((_, i) => {
  const sentence = `나는 ${learn}를 ${i}년째 공부중입니다.`;
  document.write(sentence);
  document.write('<br>');
});
```

# 4. 화살표 함수
```
const cal_Plus = (x, y) => x + y;
const cal_Minus = (x, y) => x - y;
const cal_Multiple = (x, y) => x * y;
const cal_Division = (x, y) => parseInt(x / y);

document.write(cal_Multiple(5, 5));
document.write('<br>');
document.write(cal_Plus(5, 5));
```

# 4-1. 추가 문제 - 계산기
```js
const submitBtn = document.getElementById('submit');

const inputZeroEl = document.getElementById('input-0');
const inputOneEl = document.getElementById('input-1');
const resultEl = document.getElementById('result');

const signEl = document.getElementById('sign');

submitBtn.addEventListener('click', handleClick);

function handleClick() {
  const inputZeroVal = parseFloat(inputZeroEl.value);
  const inputOneVal = parseFloat(inputOneEl.value);
  const signVal = signEl.value;
  let calcResult = 0;

  if (signVal === 'plus') {
    calcResult = inputZeroVal + inputOneVal;
  } else if (signVal === 'minus') {
    calcResult = inputZeroVal - inputOneVal;
  } else if (signVal === 'multiple') {
    calcResult = inputZeroVal * inputOneVal;
  } else if (signVal === 'division') {
    if (inputOneVal === 0) {
      alert('0으로 나눌 수 없습니다.');
      return;
    } else {
      calcResult = parseInt(inputZeroVal / inputOneVal);
    }
  }

  resultEl.innerText = calcResult;
}
```

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>자바스크립트 기초</title>
</head>

<body>
    <input type="number" id="input-0"></input>
    <select id="sign">
        <option value="plus">+</option>
        <option value="minus">-</option>
        <option value="multiple">X</option>
        <option value="division">/</option>
    </select>
    <input type="number" id="input-1"></input>
    <button id="submit">Calculate</button>

    <div id="result"></div>

    <script src="index.js"></script>
</body>

</html>
```

# 5. 클래스
```js
class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
}

let myCar1 = new Car('Ford', 2014);
let myCar2 = new Car('Audi', 2019);

document.write(myCar1.name);
document.write(myCar1.year);

document.write(myCar2.name);
document.write(myCar2.year);
```

# 6. forEach() 함수
```js
var fruits = ['apple', 'orange', 'cherry'];

function myFunction(item, index) {
  document.write(index + ':' + item + '<br>');
}

for (i = 0; i < 3; i++) {
  document.write(i);
  document.write(':' + fruits[i] + '<br>');
}

fruits.forEach((item, idx) => {
  document.write(`${idx}:${item}` + '<br>');
});
```

