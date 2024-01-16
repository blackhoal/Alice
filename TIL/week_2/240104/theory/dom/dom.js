const chicken = document.querySelector('p');
chicken.innerText = '지코바';
console.log(chicken);

const all = document.querySelectorAll('p');

console.log(all);

const bestchicken = document.querySelector('.best');
console.log(bestchicken);

const content = document.querySelector('.content');
content.innerHTML += '<h2>올해 최고의 치킨은?</h2>';
console.log(content);

const para = document.querySelector('body > h3');
console.log(para);