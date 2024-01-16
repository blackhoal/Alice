// NodeJS에서는 const ~~ = (req, res) => {} 의 형태로 많이 작성
const request = new XMLHttpRequest();

request.addEventListener('readystatechange', () => {
    // 모든 통신 상태가 완료되었을 경우
    if (request.readyState === 4 && request.status === 200) {
        console.log(request.responseText);
    // 단순히 통신 상태만 완료되었을 경우
    } else if (request.readyState === 4) {
        console.log('통신 장애 발생');
    }
});

/* 
    - 어떤 통신을 할 것인지를 명시
    - 요청과 응답이 있을 경우 통신에 대한 end point 필요
    - 5개의 HTTP 내장함수 GET, POST, PUT, DELETE, PATCH
*/
request.open('GET', 'https://jsonplaceholder.typicode.com/todos');
request.send();