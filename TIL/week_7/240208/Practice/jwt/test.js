const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

// 사용자 정보 (실제로는 데이터베이스에서 가져와야 함)
const user = {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
};

// JWT 생성 및 반환
function generateAccessToken(user) {
    return jwt.sign(user, 'secretkey', { expiresIn: '30m' });
}

// JWT 확인
function authenticateToken(req, res, next) {
    // Authorization 헤더로부터 JWT 추출
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // 토큰이 없으면 401 Unauthorized 반환

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.sendStatus(403); // 토큰이 유효하지 않으면 403 Forbidden 반환
        req.user = user;
        next(); // 다음 미들웨어로 이동
    });
}

// 사용자 인증 테스트 미들웨어
app.get('/test', authenticateToken, (req, res) => {
    res.json(req.user);
});

// JWT 생성 및 반환 테스트
app.get('/login', (req, res) => {
    const token = generateAccessToken(user);
    res.json({ token: token });
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;

    // Todo_1 : DB에서 email로 조회
    // Todo_2 : 패스워드를 bcrypt를 사용하여 넘어온 데이터가 compare했을 때 맞는지 확인
    // Todo_3 : 맞지 않을 경우
    // Todo_4 : 맞을 경우 유저의 정보를 가져와 JWT 토큰을 생성하고 이를 반환
});

// 서버 시작
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
