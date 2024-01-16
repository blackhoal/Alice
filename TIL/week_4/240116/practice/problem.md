# 1번
```js
let count = 0;

function getCount() {
  return count;
}

function resetCount() {
  count = 0;
}

function incrementSync() {
  const currentTime = Date.now();
  while (true) {
    const now = Date.now();
    if (now - currentTime > 3000) break;
  }

  count++;
}

function incrementAsync(callback) {
  setTimeout(() => {
    count++;
    callback();
  }, 3000);
}

module.exports = { getCount, resetCount, incrementSync, incrementAsync };
```

# 2번
```js
//1. 지시사항 1에 따라 아래에 코드를 작성하세요.
console.log('아메리카노 나왔습니다.');
// 아래 함수를 이용해 코드를 작성하세요.
setTimeout(() => {
  console.log('카라멜 프라푸치노 나왔습니다.');
}, 6000);

//2. 지시사항 2에 따라 아래에 코드를 작성하세요.
function order(callback) {
  // 이 곳에 코드를 작성하세요.
  setTimeout(() => {
    //카라멜 프라푸치노 나왔습니다 console log
    console.log('카라멜 프라푸치노 나왔습니다.');
    //callback 함수 부르기
    callback();
  }, 3000);
}

order(function () {
  console.log('아메리카노 나왔습니다.');
});
```

# 3번
```js
const userLeft = false;
const userEnteredChat = false;

const posts = [
  { title: 'Post 1', body: '첫번째 게시글입니다.' },
  { title: 'Post 2', body: '두번째 게시글입니다.' },
];

const canvas = document.getElementById('myCanvas');
// 2d모드의 그리기 객체를 통해 canvas에 그림을 그릴 수 있다.
const ctx = canvas.getContext('2d');
// 이미지 객체 생성
const img = new Image();
// 이미지 소스 설정
img.src = './image/m1.jpg';
// 이미지 로드이벤트- 콜백함수 등록

function usePromise() {
  return new Promise((resolve, reject) => {
    if (userLeft) {
      //사용자가 웹 페이지를 떠났을 때
      reject({
        name: 'user left',
        message: ' :(',
      });
      document.write('user left:(');
    } else if (userEnteredChat) {
      //사용자가 채팅 페이지에 접속했을 때
      resolve({
        name: 'the user has entered the chat',
        message: 'entertain the user with memes',
      });
      img.onload = function () {
        ctx.drawImage(img, 100, 100);
      };
      document.write('entertain the user with memes');
    } else {
      //정상적으로 메인페이지에 접속이 된 경우
      //메인페이지 게시글(posts)의 제목(title)과 내용(body)를 html element로 나타냅니다. 이 때 setTimeout()으로 비동기처리합니다.
      resolve('subscribe to see more memes');
      setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
          output = output + `<li>${post.title}<br> 내용: ${post.body} </li> `;
        });
        document.body.innerHTML = output;
      }, 1000);
    }
  });
}

usePromise()
  .then(message => {
    console.log('success:' + message);
  })
  .catch(error => {
    console.log(error.name + '' + error.message);
  });
```

# 4번
```js
//posts 변수를 수정하지 마세요.
const posts = [
  { title: 'Post 1', body: '첫번째 게시글입니다.' },
  { title: 'Post 2', body: '두번째 게시글입니다.' },
  { title: 'Post 3', body: '세번째 게시글입니다.' },
  { title: 'Post 4', body: '네번째 게시글입니다.' },
  { title: 'Post 5', body: '다섯번째 게시글입니다.' },
];

//getPosts() 함수를 작성하세요.
//setTimeout()를 사용해서 1초 후에 posts element를 rendering 합니다.
//위에 정의된 posts 내의 게시글 제목과 내용을 forEach()을 사용해서 rendering 합니다.
//rendering 된 게시글을 document.body.innerHTML을 사용해서 html에 띄어줍니다.
function getPosts() {
  setTimeout(() => {
    let output = '';
    posts.forEach(post => {
      output += `<li>${post.title}<br> 내용: ${post.body} </li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

//createPost() 함수를 작성하세요.
//Promise를 생성해서 resolve와 reject를 인자로 받습니다.
//Promise 내에 setTimeout으로 비동기 처리하는데, createPost()함수에 인자로 받아온 post를 push할 때 에러없이 성공적으로 호출되면(if(!error)) `resolve`를 실행하고, 그렇지 않으면 에러를 받아들이는 `reject`를 2초 후에 실행합니다.
function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = false;
      posts.push(post);
      if (!error) {
        resolve();
      } else {
        reject('ERROR!');
      }
    }, 2000);
  });
}

//createPost()를 이용해 데이터를 추가해보세요.
//title은 "Post N", body는 "N번째 게시글입니다."로 설정하세요.
createPost({
  title: 'Post N',
  body: 'N번째 게시글입니다.',
})
  .then(getPosts)
  .catch(err => console.log(err));
```

# 5번
```js
// 지시사항에 따라 코드를 작성합니다.
function resolveAfterNSeconds(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${n}초가 지났습니다!`);
    }, n * 1000);
  });
}

// 아래의 숫자를 자유롭게 변경해 가며 실행해 보세요.
// 물론 그대로 두어도 됩니다. 채점과는 무관합니다.
const inputA = 1;

// 실행 혹은 제출을 위한 코드입니다. 지우거나 수정하지 말아주세요.
module.exports = { inputs: [inputA], func: resolveAfterNSeconds };
```

# 6번
```js
// 자유롭게 코드를 작성하여, 예시 화면이 구현되도록 해 보세요.

const selectEl = document.getElementById('selectEmployeeCode');
const buttonEl = document.getElementById('buttonSubmit');
const textEl = document.getElementById('employeeEmail');

buttonEl.addEventListener('click', ev => {
  ev.preventDefault();
  const selectEmployeeCode = selectEl.value;

  fetch('employees.json')
    .then(res => res.json())
    .then(data => {
      //1. selectEmployeeCode 가진 employee 찾기
      const targetEmployee = data.Employees.find(employee => {
        return employee.employeeCode == selectEmployeeCode;
      });
      textEl.innerHTML = targetEmployee.emailAddress;
    })
    .catch(err => {
      console.log(err);
    });
});
```