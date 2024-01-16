# 1. this로 event 접근
```js
class Menu {
  // 지시사항을 참고하여 코드를 작성하세요.
  handleEvent(event) {
    let method = "on" + event.type[0].toUpperCase() + event.type.slice(1);
    this[method]();
  }

  onMousedown() {
    elem.innerHTML = '마우스 버튼을 눌렀습니다.'
  }

  onMouseup() {
    elem.innerHTML = '마우스 버튼을 뗐습니다.'
  }

  onMouseover() {
    elem.innerHTML = '마우스가 스쳐 지나갔습니다.'
  }
}

let menu = new Menu();
const elem = document.getElementById("elem");
elem.addEventListener("mousedown", menu);
elem.addEventListener("mouseup", menu);
elem.addEventListener('mouseover', menu);
```

# 2. map, filter, reduce 구현
```js
// map([3, 5, 4, 2], (i) => i * 2)

const arrayFunctions = {

  map(array, func) {
    // map 함수를 구현하세요.
    // map 함수는 배열의 각 원소를 변환한 새로운 배열을 반환합니다.
    // func - (현재 아이템) => 변환된 아이템 형식입니다.
    // ex) item => item * 2 함수는 배열의 모든 원소에 *2를 적용합니다.
    // array의 내장 map 함수를 쓰지 않고, for문을 이용해 구현해보세요.

    let newArray = [];
    for (let i = 0; i < array.length; i ++){
        let newItem = func(array[i])
        newArray.push(newItem);
    }

    return newArray;
  },


    // filter([3, 5, 4, 2], (i) => i >= 4)

  filter(array, func) {
    // filter 함수를 구현하세요.
    // filter 함수는 배열의 각 원소 중 조건에 해당하는 원소만 들어있는 새로운 배열을 반환합니다.
    // func - (현재 아이템) => 조건(true or false) 형식입니다.
    // ex) => item => item > 5 함수는 5보다 큰 값들만을 반환합니다.
    // array의 내장 filter 함수를 쓰지 않고 구현해보세요.

    let newArray = [];

    for (let i = 0; i < array.length; i++){
        let currItem = array[i];
        if(func(currItem)){
            newArray.push(currItem);
        }
    }

    return newArray;
  },


//   reduce([1, 2, 3, 4], (a, b) => a + b, 5);

  reduce(array, func, initialValue) {
    // reduce 함수를 구현하세요.
    // reduce 함수는 배열의 각 원소를 함수에 맞게 합성해 하나의 값을 반환합니다.
    // func - (합쳐진 값, 현재 아이템) => '새로운 값' 의 형식입니다.
    // initialValue - 초기값입니다. 초기값은 반드시 주어져야 합니다.
    // ex) (acc, cur) => acc + cur 함수는 배열의 모든 원소를 합칩니다.
    // array의 내장 reduce 함수를 쓰지 않고 구현해보세요.
    let result = initialValue;

    for(let i = 0; i < array.length; i++){
        result = func(result, array[i])
    }

    return result;
  },
};

export default arrayFunctions;
```

# 3. 

# 추가 문제 - MODAL
```HTML
<div class="container">
  <button id="click-button">Click</button>
  
  <div id="modal" class="do-not-show">
    Modal
  </div>
</div>
```

```CSS
body{
  margin: 0;
  padding: 0;
}

.container{
  background: linear-gradient(hsl(180, 100%, 50%), hsl(180, 100%, 80%));
  width: 100vw;
  height: 100vh;
  
  display: flex;
  justify-content: center;
  align-items: center;
}

#click-button{
  background: transparent;
  cursor: pointer;
  font-size: 2rem;
  border: .1rem solid rgba(0, 0, 0, .5);
  padding: .4rem 2.5rem;
  border-radius: .5rem;
  box-shadow: .1rem .2rem .5rem rgba(0, 0, 0, .3);
}

#modal {
  position: absolute;
  width: 40vw;
  height: 60vh;
  background: rgba(255, 255, 255, .1);
  backdrop-filter: blur(.3rem);
  border-radius: 1rem;
  box-shadow: .1rem .2rem 1rem rgba(0, 0, 0, .15);
  
  display: flex;
  justify-content: center;
  align-items: center;
}

.do-not-show{
  opacity: 0;
  pointer-events: none;
}
```

```JS
const containerEl = document.getElementsByClassName('container')[0]
const clickButton = document.getElementById('click-button');
const modalEl = document.getElementById('modal');

clickButton.onclick = (ev) => {
  ev.stopPropagation();
  modalEl.classList.toggle('do-not-show')
}

containerEl.onclick = () => {
  modalEl.classList.add('do-not-show')
}
```