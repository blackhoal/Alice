# DOM 요소 선택
```js
document.getElementsByTagName();  // 태그 이름 선택
document.getElementById();   // 아이디 선택
document.getElementsByClassName();   //클래스 선택
document.getElementsByName();  // name 속성값 선택
```

# 노드
- 종류
    - 문서 노드 : HTML 문서 전체를 나타내는 노드
    - 요소 노드 : 속성 노드를 가질 수 있는 유일한 노드 / 모든 HTML 요소
    - 주석 노드 : HTML 문서의 모든 주석
    - 속성 노드 : 모든 HTML 요소의 속성 / 요소 노드에 관한 정보를 보유 / 해당 요소 노드의 자식 노드에는 포함 X
    - 텍스트 노드 : HTML 문서의 모든 텍스트
- 접근
    - nodeName(이름) / nodeValue(값) / nodeType(타입)

# 내비게이션
```js
// 특정 기능 정지
e.preventDefault();
// 1개의 태그를 css 선택자를 기반으로 가져오기
xxx.querySelector('#intro');
// 여러 개의 태그를 css 선택자를 기반으로 가져오기
xxx.querySelectorAll('a');
// 특정 태그가 가지는 속성의 속성값을 가져오기
xxx.getAttribute('href');
// 특정 지점으로 스크롤
window.scrollTo({
    // 부드럽게 이동
    'behavior': 'smooth',
    // 선택된 영역의 상단까지의 거리를 절대 좌표로 변환 / 특정 영역의 위에서의 좌표값
    'top' : xxx.offsetTop
})
```

# 이미지 슬라이드
```js
// 특정 간격으로 코드를 반복 실행
setInterval(function() {
    ...
}, 3000);
// 애니메이션 실행
xxx.animate({
    ...
}, {
    duration: 500,
    easing: 'ease',
    iterations: 1,
    fill: 'both'
})

// 이전 요소 선택
xxx.previousElementSibling;
// 다음 요소 선택
xxx.nextElementSibling;
// 부모 요소 선택
xxx.parentElement;
// 첫 번째 자식 요소 선택
xxx.firstElementChild;
// 마지막 자식 요소 선택
xxx.lastElementChild;
```

# 탭 버튼
```js
// 요소에 클래스명 추가
xxx.classList.add(클래스명);
// 요소에 특정 클래스 제거
xxx.classList.remove(클래스명);
// 배열의 모든 요소에 코드 적용
nodeList.forEach(function(item) {
    console.log(item)
})
```