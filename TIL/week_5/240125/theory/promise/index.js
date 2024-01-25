// API콜 캐싱 예시
const cache = new Map();

function getSomethingFromRemote(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // fetch가 promise를 리턴하기 때문에 여기서도 강제로 promise화를 해줘야한다. 함수는 항상 일관된 리턴 타입을 가져야한다. 가령, 하나의 리턴문에서 Promise를 리턴한다면 다른 리턴문들도 Promise를 러턴해야한다.
  }
  if (url !== undefined && url !== null && url.length > 0) {
    return fetch(url)
      .then((response) => response.json())
      .then((result) => {
        cache.set(url, result);
        return result;
      }); // promise를 리턴
  }
  return Promise.reject(new Error("URL이 있어야합니다."));
}

// promise flattening 예시
fetch("https://ipapi.co/json")
  // 아래의 response.json은 promise를 리턴하지만 promise가 resolve되면 다음 then으로 넘어간다.
  .then((response) => response.json())
  // 아래의 json.city는 string값(promise X)
  // then에게 넘겨주는 함수는 primitive 또는 promise를 리턴할 수 있다. 결과는 같다.
  // .then((json) => Promise.resolve(json.city))
  .then((json) => json.city)
  .then((city) => console.log(city));

Promise.resolve(1);
new Promise((resolve, reject) => {
  resolve(1);
});

Promise.reject(new Error("some error"));
new Promise((resolve, reject) => {
  // resolve(1)
  reject(new Error("some error"));
});

const a = 1;
const b = 2;

fetch("https://www.google.com")
  .then((response) => response.json)
  .catch()
  .finally(() => {
    console.log("나는 언제든지 불림");
  });

const box = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("나는 1초 뒤에 불림");
    resolve();
  }, 1000);
});

// do something;

box.then();
