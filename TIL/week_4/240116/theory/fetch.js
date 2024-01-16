fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => {
        console.log(res.json());
    }).catch(err => {
        console.log(err);
    })