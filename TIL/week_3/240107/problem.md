# 1번
```js
// HTML <img> 요소를 선택하도록 코드를 작성하세요.
var imgs = document.getElementsByTagName('img');

// HTML <div> 요소를 선택하도록 코드를 작성하세요.
var selectedTagName = document.getElementsByTagName('div');

// 아이디가 “gtomato"인 요소를 선택하도록 코드를 작성하세요.
var selectedId = document.getElementById('gtomato');

// 클래스가 "vegetable"인 모든 요소를 선택하도록 코드를 작성하세요.
var selectedClassNameS = document.getElementsByClassName('vegetable');

// name 속성값이 "tomato"인 모든 요소를 선택하도록 코드를 작성하세요.
var selectedNameS = document.getElementsByName('tomato');

// 선택된 요소들을 출력합니다. 출력 순서를 변경하면 오답 처리가 됩니다.
document.write(imgs + '<br>');
document.write(imgs[0] + '<br>');
document.write(selectedTagName + '<br>');
document.write(selectedId + '<br>');
document.write(selectedClassNameS + '<br>');
document.write(selectedNameS[0] + '<br>');

document.write(selectedTagName[1].textContent + '<br>');
document.write(selectedId.textContent + '<br>');
```

# 2번
```js
/*지시사항을 따라 작성해주세요*/
var target = document.getElementById('btn');

function changeButtonOnclick() {
  /*지시사항 1번*/
  target.classList.add('changeColor');

  /*지시사항 2번*/
  target.innerText = '버튼 클릭 성공!';
}

/*지시사항 3번*/
target.addEventListener('click', changeButtonOnclick);
```

# 3번
```js
const image = document.getElementsByClassName('zoom-img')[0];

function zoomIn() {
  image.style.transform = 'scale(1.2)';
  image.style.transition = 'all 0.5s';
}

function zoomOut() {
  image.style.transform = 'scale(1)';
  image.style.transition = 'all 0.5s';
}

image.addEventListener('mouseenter', zoomIn);
image.addEventListener('mouseleave', zoomOut);
```

# 4번
```js
// 1.‘Home’이라고 적힌 <li> 태그를 생성하세요.
let li = document.createElement("li");
li.textContent = "Home";

// 2.insertBefore()를 사용해서 menu의 <li> 태그 앞에 'Home'을 삽입하세요.
let menu = document.getElementById("menu");

menu.insertBefore(li, menu.firstElementChild);

// 3. insertBefore()를 사용해서 calendar의 첫 번째 child로 예약 알람 문구를 삽입하세요.
let calendar = document.getElementById("calendar");

let div = document.createElement("div");
div.innerHTML = "<strong>안녕하세요!</strong> 예약하신 날짜입니다.";
calendar.insertBefore(div, calendar.firstElementChild);

// 4. removeChild()를사용해서 'Contact'라고 적힌 <li> 태그를 삭제하세요.
menu.removeChild(menu.lastElementChild);
```

# 5번
```js
var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");

//form submit event
form.addEventListener("submit", addItem);
//delete event
itemList.addEventListener("click", removeItem);
//filter event
filter.addEventListener("keyup", filterItems);

//Add item
function addItem(e) {
  e.preventDefault();

  //Get input value
  var newItem = document.getElementById("item").value;
  //Create new li element
  var li = document.createElement("li");
  //add Class
  li.className = "list-group-item";
  // Add text node with input value
  li.appendChild(document.createTextNode(newItem));

  //crate delete button element
  var deleteButton = document.createElement("button");
  // add classes to delete button
  deleteButton.className = "btn btn-danger btn-sm float-right delete";
  // append text node
  deleteButton.appendChild(document.createTextNode("삭제"));
  //append button to li
  li.appendChild(deleteButton);
  //append li to list
  itemList.appendChild(li);
}

//Remove item
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

//filter Event
function filterItems(e) {
  //convert to lowercase
  var text = e.target.value.toLowerCase();
  //get lis
  var items = itemList.getElementsByTagName("li");
  //conver to an array
  Array.from(items).forEach((item) => {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
```

# 6번
```js
window.onload = function () {
  var el = document.getElementById("change_heading");
  el.innerText = "카 레이싱 대회";

  var section = document.querySelector("section");
  section.addEventListener("mouseover", function (event) {
    var selectedColor = document.querySelector(".selected");
    selectedColor.innerText = event.target.className;
  });

  var newDiv = document.createElement("div");
  newDiv.className = "purple";
  section.appendChild(newDiv);

  var button = document.querySelector("button");
  var car1 = document.querySelector(".car1");
  var car2 = document.querySelector(".car2");
  car1.style.marginLeft = 0;
  car2.style.marginLeft = 0;

  function reset(car1, car2) {
    clearTimeout(car1.timer);
    clearTimeout(car2.timer);
    car1.style.marginLeft = 0;
    car2.style.marginLeft = 0;
    button.disabled = false;
  }

  button.addEventListener("click", function (event) {
    button.disabled = true;
    car1.timer = setInterval(function () {
      car1.style.marginLeft =
        parseInt(car1.style.marginLeft) + Math.random() * 60 + "px";
      if (parseInt(car1.style.marginLeft) > window.innerWidth) {
        alert("Car 1 wins!");
        reset(car1, car2);
      }
    }, 60);

    car2.timer = setInterval(function () {
      car2.style.marginLeft =
        parseInt(car2.style.marginLeft) + Math.random() * 60 + "px";
      if (parseInt(car2.style.marginLeft) > window.innerWidth) {
        alert("Car 2 wins!");
        reset(car1, car2);
      }
    }, 60);
  });
};
```

