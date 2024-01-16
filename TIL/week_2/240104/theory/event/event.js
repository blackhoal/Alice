const btn = document.querySelector('button')

/*
btn.addEventListener('click', e=> {
    console.log(e);
    console.log('버튼이 클릭되었습니다')
});
*/

const orders = document.querySelectorAll('li')

// event => 각각의 li 태그 하나하나에 이벤트를 적용
orders.forEach(order => {
    order.addEventListener('click', e => {
        console.log(e.target);
        e.target.remove();
        console.log(`${e.target.innerText}이 완료되었습니다`)
    });
})