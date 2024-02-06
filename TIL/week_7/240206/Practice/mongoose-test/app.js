const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Jason:<password>@cluster0.h6hywhr.mongodb.net/')
    .then(() => console.log('Connected!'));

const User = mongoose.model('user', new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    age: Number,
}));


app.post("/users", async (req, res) => {
    // TODO: 유저를 추가하세요 (CREATE)

    // 방법 1
    const { name, username, email, age } = req.body;
    const create_User = new User({name: name, username: username, email: email, age: age});
    
    // 방법 2
    // const create_User = new User(req.body);

    await create_User.save();
    res.send('사용자 등록 완료');
})

app.get('/read', function(req,res){
    
});

app.get("/users", async(req, res) => {
    // TODO: 모든 유저를 가져오세요. (READ)
    const users = await User.find();

    // _id의 내림차순 & 3명까지만 출력
    // _id의 오름차순 _id: 1
    const sort_Users = await User.find()
        .sort({_id: -1})
        .limit(3).exec();
    
    // 정렬 커스터마이징
    // localhost:3000/users?sort=asc&limit=3
    const custom_Sort = req.query.sort === 'asc'? 1 : -1;

    const customSort_Users = await User.find()
        .sort({_id: custom_Sort})
        .limit(req.query.limit).exec();

    res.json(users);

    /*
        // Find All
        await User.find({});

        // Find All documents named john and at least 18 age 
        await User.find({ name: 'john', age: { $gte: 18 } }).exec();

        // executes, name LIKE john and only selecting the "name" and "friends" fields
        await User.find({ name: /john/i }, 'name friends').exec();

        // passing options
        await User.find({ name: /john/i }, null, { skip: 10 }).exec();
    */
    
})

app.put("/users/:email", async (req, res) => {

    // TODO: 특정 email에 대해서 age, name, username를 수정하는데 바디에 넘겨준 값으로 수정해보세요. (UPDATE)
})

// http://localhost:3000/users/<email>
app.delete("/users/:email", async(req, res) => {
    // TODO: email에 해당하는 유저를 삭제해보세요  (DELETE)
    const email = req.params.email;
    const result = await User.deleteOne({ email: email});
    console.log(result);

    return res.send('삭제 완료')
    
    res.json({deleteCount: result.deletedCount});
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
