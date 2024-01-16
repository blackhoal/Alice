const addForm = document.querySelector('.add');
const list = document.querySelector('.memos');
const alertmsg = document.querySelector('#alertmsg');
const search = document.querySelector('.search input');

const saveMemo = memoText => {
    const html = 
    `
    <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${memoText}</span><i class="far fa-trash-alt delete"></i>
    </li>
    `
    list.innerHTML += html;
}

addForm.addEventListener('submit', e => {
    e.preventDefault();
    const memo = addForm.add.value;    
    
    if (memo.length) {
        saveMemo(memo);
        alertmsg.classList.add('hidden');
        addForm.add.value = '';
    } else {
        alertmsg.classList.remove('hidden');
    }
})

list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
})

const filterMemo = memo => {
    Array.from(list.children)
    .filter((memoText) => !memoText.textContent.includes(memo))
    .forEach((memoText) => memoText.classList.add('filtered'));

    Array.from(list.children)
    .filter((memoText) => memoText.textContent.includes(memo))
    .forEach((memoText) => memoText.classList.remove('filtered'));
}

search.addEventListener('keyup', e => {
    const searchText = search.value;
    filterMemo(searchText);
})