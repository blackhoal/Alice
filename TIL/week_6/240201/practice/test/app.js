// app.js
const express = require('express');
const mongoose = require('mongoose');

const Movie = require("./models/movies");

const app = express();

mongoose.connect('mongodb+srv://Jason:LtkJvhzmhTT6eEh8@cluster0.h6hywhr.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Connected!'));

/*
    TODO
    - test 폴더 생성 후 내부에 app.js 파일을 생성하고 해당 내용을 작성한 후
    npm i express(경로는 test 내에 존재)
    node_modules와 package.json, package-lock.json이 생성
    localhost:3000/products -> get을 사용 가능한 API 만들기
    localhost:3000/carts -> 카트 목록을 가져오는 get API 만들기

    라우터 js 파일 생성 - product.js, cart.js
    get 만들고 파일 불러와서 연결
*/
app.get("/", (req, res) => {
    res.send("3231");
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})