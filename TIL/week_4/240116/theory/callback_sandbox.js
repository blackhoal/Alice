// callback chain
const getCommunication = (resource, callback) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readyStateChange', () => {
        if (request.readyState === 4 && request.status === 200) {
            const data = JSON.parse(request.responseText);
            callback(undefined, data);
        } else if (request.readyState === 4) {
            callback('통신 장애 발생', request.responseText);
        }
    });

    request.open('GET', resource);
    request.send();
}

getCommunication('https://jsonplaceholder.typicode.com/todos/1', (err, data) => {
    console.log(data.title);
    console.log(data.id);
    getCommunication('https://jsonplaceholder.typicode.com/todos/2', (err, data) => {
        console.log(data.title);
        console.log(data.id);
        getCommunication('https://jsonplaceholder.typicode.com/todos/3', (err, data) => {
            console.log(data.title);
            console.log(data.id);
        })
    })
})