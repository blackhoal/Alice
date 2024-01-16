# 실습 2-1
```js
// HTML <div> 요소를 선택하도록 코드를 작성하세요
var selectedTagName = document.getElementsByTagName('div');

// 아이디가 “banana"인 요소를 선택하도록 코드를 작성하세요
var selectedId = document.getElementById('banana');

// 클래스가 "vegetable"인 모든 요소를 선택하도록 코드를 작성하세요
var selectedClassNameS = document.getElementsByClassName('vegetable');

// name 속성값이 "red"인 모든 요소를 선택하도록 코드를 작성하세요
var selectedNameS = document.getElementsByName('red');

// 선택된 요소들을 출력합니다.
document.write(selectedTagName);
document.write(selectedId);
document.write(selectedClassNameS);
document.write(selectedNameS);
```

# 실습 2-2
```js
// 아이디가 "apple"인 요소를 선택하도록 코드를 작성하세요
var selectedId = document.getElementById('apple');

// 선택한 요소의 색깔을 red로 바꿉니다.
selectedId.style.color = 'red';
```

# 실습 2-3
```js
// 아이디가 "apple"인 요소를 선택하도록 코드를 작성하세요
var selectedId = document.getElementById('apple');

// 선택한 요소의 내용을 "strawberry"로 바꿉니다.
selectedId.innerHTML = 'strawberry';

// 아이디가 "onion"인 요소를 선택하도록 코드를 작성하세요
var selectedId_2 = document.getElementById('onion');

// 선택한 요소의 내용을 "garlic" 바꿉니다.
selectedId_2.innerHTML = 'garlic';
```

# 실습 2-4
```js
// 1. document 의 자식 노드들 중 두번째 노드를 node1변수에 할당하도록 코드를 작성하세요.
var node1 = document.childNodes[1];

// 2. node1의 자식 노드들 중 세번째 노드를 node2변수에 할당하도록 코드를 작성하세요.
var node2 = node1.childNodes[2];

// 3. node2의 자식 노드들 중 두번째 노드를 node3변수에 할당하도록 코드를 작성하세요.
var node3 = node2.childNodes[1];

// 4. node1, node2, node3의 이름을 nodeName을 이용해 출력하도록 코드를 작성하세요.

document.write(node1.nodeName);
document.write(node2.nodeName);
document.write(node3.nodeName);

//5. `node2`의 자식 변수들을 모두 출력해봅니다.
console.log(node2.childNodes);
```

# 실습 2-5
```js
// 1. document.getElementById()를 사용하여 아이디가 apple인 요소를 선택하도록 코드를 작성하세요.
var apple_node = document.getElementById('apple');

// 2. firstChild.nodeValue를 사용하여 node의 첫번째 자식 노드의 값을 `apple_pie`로 변경하도록 코드를 작성하세요.
apple_node.firstChild.nodeValue = 'apple_pie';
```

# 실습 2-6
```js
// 1. 아이디가 apple인 요소의 첫번째 자식 노드를 선택하도록 코드를 작성하세요.
var apple_node = document.getElementById('apple').childNodes[0];

// 2. apple_node의 값을 변수에 할당하도록 코드를 작성하세요.
var apple_node_value = apple_node.nodeValue;

// 3. apple_node의 타입을 변수에 할당하도록 코드를 작성하세요.
var apple_node_type = apple_node.nodeType;
```


# 실습 2-7
```html
<button onclick="this.innerText = '성공입니다!'">클릭하세요!</button>
```

```js
//  window.onload를 사용하여 HTML 문서가 로드될 때 이벤트 핸들러가 작동하도록 해보세요.
window.onload =
  // "페이지가 열렸습니다" 문구를 띄우는 함수를 작성하세요.
  function () {
    // 아이디가 "text"인 요소를 선택하도록 코드를 작성하세요..
    var text = document.getElementById('text');
    text.innerHTML = '페이지가 열렸습니다';
  };
```

# 실습 2-8
```js
// 1. 아이디가 "carrot"인 요소를 선택하세요
var carrot_btn = document.getElementById('carrot');

// 2. click 할 시 텍스트를 보여주는 함수를 작성합니다.
//    버튼을 클릭하면 "토끼가 나타났어요!!" 문장을 출력하도록 해보세요
function showText() {
  document.getElementById('text').innerHTML = '토끼가 나타났어요!!';
}

// 3. 선택한 요소에 "click" 이벤트 핸들러를 등록하세요 (이벤트명:"click", 함수이름)
carrot_btn.addEventListener('click', showText);
```