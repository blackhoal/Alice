// 필요한 모듈 가져오기
const express = require('express');
const session = require('express-session');

// Express 애플리케이션 생성
const app = express();

// 세션 설정
app.use(session({
    secret: 'secret-key', // 세션에 사용되는 암호화 키
    resave: false, // 세션 변경 사항을 저장할지 여부
    saveUninitialized: false // 초기화되지 않은 세션 저장 여부
}));

// 미들웨어 설정 - POST 데이터를 파싱할 수 있도록 함
app.use(express.urlencoded({ extended: false }));

// 라우트: 로그인 폼
app.get('/login', (req, res) => {
    res.send(`
        <h2>Login</h2>
        <form method="post" action="/login">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Login</button>
        </form>
    `);
});

// 라우트: 로그인 처리
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // 여기서는 단순 예제이므로 실제로는 데이터베이스나 다른 인증 메커니즘을 사용해야 합니다.
    // 예제를 단순화하기 위해 하드코딩된 사용자 정보를 사용합니다.
    if (username === 'user' && password === 'pass') {
        req.session.isLoggedIn = true;
        req.session.username = username;
        res.redirect('/profile');
    } else {
        res.send('Invalid username or password');
    }
});

// 라우트: 프로필 페이지
app.get('/profile', (req, res) => {
    if (req.session.isLoggedIn) {
        res.send(`<h2>Welcome ${req.session.username}</h2><a href="/logout">Logout</a>`);
    } else {
        res.redirect('/login');
    }
});

// 라우트: 로그아웃
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.redirect('/login');
        }
    });
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
