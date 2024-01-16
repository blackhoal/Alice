// 내장함수, 내장객체
const now = new Date();

console.log(now);

console.log('getFullYear: ', now.getFullYear());
console.log('getMonth: ', now.getMonth());
console.log('day: ', now.getDay());

let park = {
    name: '진성',
    age: 30,
}

let smartphone = {
    company: 'apple',
    price: 2000
}

console.log(park);

let member = {
    name:'길동',
    age: 30,
    email: 'abc@email.com',
    tel: '000-0000-0000'
}

function User(name, age, email, tel) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.tel = tel;
}

let newUser = new User('길동', 30, 'abc@email.com', '000-0000-0000');
let lady = new User('여성1', 35, 'w@gmail.com', '111-1111-1111');

console.log(newUser);
console.log(lady);