const link = document.querySelector('a')
console.log(link.getAttribute('href'))

const p = document.querySelector('p')
console.log(p.getAttribute('class'))

link.setAttribute('href', 'https://www.google.com')
link.innerText = '역시 검색은 구글'

p.classList.remove('error')
p.classList.add('success')

const h2 = document.querySelector('h2')

h2.style.margin = '50px'
h2.style.color = 'red'
h2.style.fontSize = '50px'