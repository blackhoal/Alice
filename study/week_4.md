# 1. 자바스크립트 제어 흐름
![4-3](https://github.com/blackhoal/Elice/blob/main/study/img/4-3.png?raw=true)  
- 자바스크립트는 싱글 스레드 런타임을 언어이므로 한 번에 하나의 작업만 수행 가능
- 이전 작업이 완료되어야 다음 작업을 수행 가능하므로 위에서 아래 방향으로 차례로 동작(동기 방식)
- 동기 방식은 간단하고 직관적이지만 작업 시간이 길거나 응답이 늦을 경우 성능 저하 有
- 비동기 방식을 통해 특정 작업의 완료를 기다리지 않고 다른 작업을 동시에 수행 가능
- 브라우저에서 별도의 API를 사용하여 비동기 방식의 작업을 수행

## 1-1. 자바스크립트 Runtime 동작 순서
```
1. 함수는 Call Stack에 LIFO 순서로 누적되어 실행
2. 함수에 콜백 함수가 존재 시 JS 내부에서 처리 가능하면 Call Stack에 누적
    - JS 내부에서 처리가 힘든 경우 Web API에게 위임
3. Web API는 비동기 API 실행 후 콜백 함수를 Callback Queue에 삽입
4. Event Loop는 Call Stack이 비었을 때 Callback Queue에서 콜백 함수를 추출 후 Call Stack에 삽입
5. Call Stack에 삽입된 콜백 함수는 pop 된 후 실행
```

## 1-2. 동기 VS 비동기
![4-1](https://github.com/blackhoal/Elice/blob/main/study/img/4-1.png?raw=true)  
- 동기식 : 현재 실행 중인 코드가 종료되기 전까지 다음 코드를 실행하지 않는 것
- 비동기식 : 현재 실행 중인 코드가 존재해도 병렬적으로 다른 코드를 실행하는 것

<br>

# 2. 비동기식(Asynchronous)
- 함수의 실행 결과가 즉시 반환되지 않고, 특정 조건이 충족될 때까지 대기하는 특성

## 2-1. 비동기 처리 방식
||callback|promise|async/await|
|:----:|:----:|:----:|:----:|
|에러 처리|콜백 함수 내에서 처리|catch()로 처리|try-catch 블록으로 처리|
|가독성|짧으면 우수 / 길어질수록 복잡|good|good|
|중첩 처리|콜백 함수 내에서 처리|then() 사용|await 키워드 사용|
- 콜백(Callback) 함수
    - 함수의 매개변수에 함수 자체를 넘겨, 함수 내에서 매개변수 함수를 실행하는 기법
- Promise
    - 콜백 함수의 단점을 보완하여 비동기 작업의 결과 여부와 해당 결과값을 나타내는 객체
- async / await
    - 콜백 함수와 Promise의 단점을 보완하여 가장 최근에 나온 비동기 처리 패턴

## 2-2. 문제점
- 흐름을 쉽게 예측하기 어려움 : 비교적 효율적이지만 무엇이 어떤 순서로 진행될지 예측이 어려움
- 콜백 지옥 : 각각의 비동기 작업이 종료되었을 때 뒤에 이어질 작업을 미리 부여하는 식으로만 흐름을 제어 가능하므로 콜백 지옥 가능성 有

<br>

# 3. Promise
![4-2](https://github.com/blackhoal/Elice/blob/main/study/img/4-2.png?raw=true)  
```js
/* Callback Hell */
function increaseAndPrint(n, callback) {
  setTimeout(() => {
    const increased = n + 1;
    console.log(increased);
    if (callback) {
      callback(increased);
    }
  }, 1000);
}

increaseAndPrint(0, n => {
  increaseAndPrint(n, n => {
    increaseAndPrint(n, n => {
      increaseAndPrint(n, n => {
        increaseAndPrint(n, n => {
          console.log('끝!');
        });
      });
    });
  });
});

/* Promise 객체를 통한 코드 수정 */
function increaseAndPrint(n) {
  return new Promise((resolve, reject)=>{
    setTimeout(() => {
      const increased = n + 1;
      console.log(increased);
      resolve(increased);
    }, 1000)
  })
}

increaseAndPrint(0)
  .then((n) => increaseAndPrint(n))
  .then((n) => increaseAndPrint(n))
  .then((n) => increaseAndPrint(n))
  .then((n) => increaseAndPrint(n));
```

## 3-1. 사용 이유
- 기존의 비동기 처리를 위한 하나의 전통적인 패턴으로 콜백 함수를 사용
    - 여러 비동기 작업을 순차적으로 수행 시 콜백 함수가 중첩되어 코드의 깊이가 깊어지는 현상(Callback Hell)으로 인해 한계가 존재
    - 콜백 함수가 중첩됨에 따라 가독성이 떨어지고 코드의 흐름 파악에 어려움이 발생
- promise 객체를 통해 콜백 함수를 대체 및 비동기 작업의 흐름을 쉽게 제어 가능

## 3-2. 이점
- 비동기 처리 시점을 명확하게 표현 가능
- 연속된 비동기 처리에 대한 수정, 삭제, 추가 등의 작업을 쉽고 유연하게 가능
- 비동기 작업 상태를 쉽게 확인 가능
- 코드의 유지 보수성 증가

## 3-3. 후속 처리 메소드
```js
/* 1. then() 사용 */
const promise = () => new Promise((resolve, reject) => {
    let a = 1 + 1

    if(a == 3) {
        resolve('success')
    } else {
        reject('failed')
    }
})

// 두 개의 콜백 함수(message, error)
promise().then((message) => {
    console.log('This is in the then ' +  message)
}, (error) => {
    console.log('This is in the then ' +  error)
})

/* 2. catch() 사용 */
const promise = () => new Promise((resolve, reject) => {
    let a = 1 + 1

    if(a == 3) {
        resolve('success')
    } else {
        reject('failed')
    }
})

promise().then((message) => {
    console.log('This is in the then ' +  message)
}).catch((error) => {
    console.log('This is in the catch ' + error)
})
```
- then
    - 두 개의 콜백 함수를 인자로 지정
    - 첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 경우)시에 실행
    - 두 번째 콜백 함수는 실패(rejected, reject 함수가 호출된 경우)시에 실행
    - then 메소드는 기본적으로 Promise를 반환
- catch
    - 비동기 처리 혹은 then 메소드 실행 중 에러(예외)가 발생 시 호출
    - catch 메소드 또한 Promise를 반환
    - Promise의 에러를 처리 시 더 많은 상황의 예외를 처리 가능한 catch 메소드의 사용을 권장

## 3-4. Promise 상태
![4-4](https://github.com/blackhoal/Elice/blob/main/study/img/4-4.png?raw=true)  
```js
/* 
    1. pending(대기) : 처리가 완료되지 않은 상태
*/
new Promise((resolve, reject)) => {...}; 

/* 
    2. fulfilled(이행) : 성공적으로 처리가 완료된 상태
*/
new Promise((resolve, reject)) => {
    resolve();
};

/* 
    3. rejected(거부) : 처리가 실패로 끝난 상태
*/
new Promise((resolve, reject)) => {
   reject();
};
```
- pending(대기)
    - 생성자를 통해 Promise 객체를 생성 시 Pending(대기) 상태로 변경
- fulfilled(이행)
    - executor 함수 인자 중 하나인 resolve 함수를 실행 시 fulfilled(이행) 상태로 변경
- rejected(거부)
    - executor 함수 인자 중 하나인 reject 함수를 실행 시 rejected(거부) 상태로 변경

## 3-5. Promise Method
```js
/* Promise.resolve */
const promise = Promise.resolve('success') 
// new Promise(resolve => resolve('success'))

promise.then(message => console.log('This is in the then ' + message))

/* Promise.reject */
const promise = Promise.reject('failed') 
// new Promise((resolve, reject) => reject('failed'))

promise.catch(error => console.log('This is in the catch ' + error))

/* Promise.all */
const promise1 = () => new Promise(resolve => setTimeout(() => resolve(1), 1000))
const promise2 = () => new Promise(resolve => setTimeout(() => resolve(2), 2000))
const promise3 = () => new Promise(resolve => setTimeout(() => resolve(3), 3000))

promise1().then(result => {
    console.log(result) // 프로그램을 실행하고 1초뒤에 수행됨
    return promise2()
}).then(result => {
    console.log(result) // 프로그램을 실행하고 3초뒤에 수행됨 (1 + 2)
    return promise3()
}).then(result => {
    console.log(result) // 프로그램을 실행하고 6초뒤에 수행됨 (1 + 2 + 3)
})

/* Promise.race */
Promise.race([
    new Promise(resolve => setTimeout(() => resolve(1), 1000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 3000))
]).then(console.log) 
.catch(console.log)

/* Promise.allSettled */
Promise.allSettled([
    new Promise(resolve => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(2), 2000))
]).then(console.log)
```
- Promise.resolve 
    - 인자값을 래핑하여 Promise를 반환(fulfilled)
- Promise.reject
    - 인자값을 래핑하여 Promise를 반환(rejected)
- Promise.all
    - Promise가 담겨있는 배열과 같은 이터러블 객체를 인자로 설정
    - 인자로 전달 받은 모든 Promise를 병렬 처리 및 결과값을 배열에 담아 resolve로 반환
- Promise.race
    - `Promise.all`과 동일하게 Promise가 담긴 이터러블 객체를 인자로 설정 
    - `Promise.all`과 달리 병렬로 처리하지 않고 가장 먼저 종료되는 Promise의 결과값을 resolve로 반환
- Promise.allSettled
    - `Promise.all` 동일하게 Promise가 담겨있는 이터러블 객체를 인자로 설정 및 병렬 처리
    - `Promise.all`의 경우 Promise를 수행 중 하나라도 에러(rejected)가 발생 시 rejected 상태가 되고 수행을 종료하지만, `Promise.allSettled`의 경우 rejected 상태가 되어도 수행을 종료하지 않으며 Promise가 수행된 상태 및 결과값을 배열에 담아 resolve로 반환

## 3-6. Promise Chaining
```js
const promise = (result) => {
    return new Promise((resolve, reject) => {
        if(result == 'success')
            resolve('success')
        else
            reject('failed')
    })
}

promise('success')
    .then(promise) // .then(result => promise(result))
    .then(message => console.log('This is in the then ' + message))
    .catch(error => console.log('This is in the catch ' + error))
```
- 비동기 함수의 결과를 받아 비동기 함수를 호출 시 함수의 호출이 중첩되어 콜백 지옥이 발생 가능
- Promise는 후속 처리 메소드(then(), catch())를 체이닝하여 Promise를 반환하는 여러 비동기 함수를 연결하여 사용 가능

<br>

# 4. async / await
![4-5](https://github.com/blackhoal/Elice/blob/main/study/img/4-5.png?raw=true)  

## 4-1. 사용 이유
- 기존의 비동기 처리를 위한 전통적인 패턴으로 콜백 함수 및 Promise를 사용
    - Callback Hell 또는 여러 Promise가 서로 의존하는 상황이 발생 시 코드의 가독성이 저하
- `async / await` 패턴을 통해 콜백 함수 및 Promise의 단점을 보완 가능
- 비동기적 접근 방식을 동기적으로 작성 가능하도록 함으로써 코드의 간결성 및 가독성이 높아져 유지보수성 증가
- `async / await` 패턴이 `Promise`를 대체하는 것은 X
    - 내부적으로는 여전히 `Promise`를 통해 비동기를 처리하지만 사용자가 유지보수를 편하게 할 수 있도록 문법만 다르게 적용

## 4-2. 사용법
```js
/*
    async 함수 변환 규칙
    1. 함수에 async 키위드를 정의
    2. executor 본문 내용만 남기고 new Promise... 부분 제거
    3. resolve(value); 부분을 return value; 로 변경
    4. reject(new Error(…)); 부분을 throw new Error(…); 로 수정
*/

/* 기존 Promise 형태 */
function main() {
  delay(1000)
      .then(() => {
        return delay(2000);
      })
      .then(() => {
        return Promise.resolve('끝');
      })
      .then(result => {
        console.log(result);
      });
}

/* async/await 형태 */
async function main() {
  await delay(1000);
  await delay(2000);
  const result = await Promise.resolve('끝');
  console.log(result);
}

main();
```
- 함수 앞에 `async`를 정의 
    - `await` 사용을 위한 선언문의 개념
    - `return`은 `resolve()`와 같은 역할을 수행하며 어떤 값을 반환하든 무조건 Promise 객체로 감싸져 반환
    - `async` 함수에서도 `then()` 메서드를 사용 가능하지만 권장 X 
- 비동기로 처리되는 부분에 `await` 정의 
    - Promise 비동기 처리가 완료되어 Promise의 상태가 변경될 때까지 코드의 실행을 일시 중지 및 대기
    - async 함수 내에서만 사용 가능
    - Promise에서는 `then()` 메소드를 통해 동기적으로 처리하지만 `async / await`에서는 `await` 사용만으로 간편한 처리 가능

## 4-3. 에러 처리
```js
/* 1. catch() */
async function promise() {
    throw 'error';
}

promise()
    .then(result => console.log('status : fulfilled,', result))
    .catch(error => console.log('status : rejected,', error))

/* 2. try-catch */
async function promise() {
    throw 'rejected';
}

async function exceptionFunc() {
    try {
        await promise()
    } catch (e) {
        console.log('catch error!', e)
    }
}

exceptionFunc()

/* 3. catch() + try-catch */
async function promise() {
    throw 'rejected';
}

async function exceptionFunc() {
    try {
        return await promise()
    } catch (e) {
        console.log('catch error!', e)
        throw e
    }
}

exceptionFunc()
    .then(result => console.log('status : fulfilled,', result))
    .catch(error => console.log('status : rejected,', error))
```
- 함수 내부에서 예외가 발생했지만 예외를 내부가 아닌 외부로 넘겨 처리를 원할 경우 catch() + try-catch를 혼용하여 사용

<br>

# Reference
[참조 1](https://yoo11052.tistory.com/165?category=946829)  
[참조 2](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%B2%98%EB%A6%AC-async-await)  
[참조 3](https://springfall.cc/article/2022-11/easy-promise-async-await)  