const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlainTextPassword = 'jason1234';
const someOtherPlainTextPassword = 'notMyPassword1234';

bcrypt.hash(myPlainTextPassword, saltRounds, function(err, hash) {
    console.log(`error is ${err}`);
    console.log(`hash is ${hash}`);
})