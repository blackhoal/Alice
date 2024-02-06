# 3번
```js
// mart.js
module.exports = egg => {
  if (egg) {
    for (i = 0; i < 6; i++) {
      console.log('Buy milk');
    }
  }
};

// index.js
// "./lib/mart.js"에서 모듈을 불러오는 코드를 작성하세요.
var shopping = require('./lib/mart.js');

// 가져온 모듈의 매개변수에 true를 전달하여 결과를 확인하세요.
shopping(true);
```

# 4번
```js
 var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
const port = 8080;

var server = http.createServer(function(req, res) {

    if(req.method == 'GET'){
        fs.readFile('./index.html' ,'utf8' ,function(error, data) {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(data);
        });
    }
    else if(req.method == 'POST'){
        req.on('data', function(chunk){

            var data = querystring.parse(chunk.toString());
            
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end('ID : ' + data.id + 'PW : ' + data.pw);
        });
    }


}).listen(port, function() {
    console.log('Server is running...');
});
```

# 5번
```js
const express = require("express");
const app = express();
const port = 8080;

// 웹 서버를 만들고 화면에 "테스트를 시작하겠습니다!"를 출력하세요.
app.get("/", (req, res) => {
  res.send("테스트를 시작하겠습니다!");
});

// 서버는 8080번 포트로 서버를 여세요.
app.listen(port);
```

# 6번
```js
// index.js
// 8080번 포트를 이용해 서버를 열고,routes 폴더에 있는 두 라우터를 등록하세요.
const express = require("express");
const midtermRouter = require("./routes/midterm");
const finalRouter = require("./routes/final");

const app = express();

// midterm.js는 "/midterm" 경로에, final.js는 "/final" 경로에 연결하세요.
app.use("/midterm", midtermRouter);
app.use("/final", finalRouter);

app.listen(8080);

// midterm.js
// "중간고사입니다."를 출력하는 라우터를 정의하고 export하세요.
const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("중간고사입니다.");
});

module.exports = router;

// final.js
// "기말고사입니다."를 출력하는 라우터를 정의하고 export하세요.
const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("기말고사입니다.");
});

module.exports = router;
```

# 7번
```js
// user.js
const { Schema } = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

module.exports = UserSchema;

// index.js
const mongoose = require("mongoose");
const UserSchema = require("./schemas/user");

exports.User = mongoose.model("User", UserSchema);
```
