const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const postRoutes = require('./routes/post-routes');
const authRoutes = require('./routes/auth-routes');
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, 
}));

app.use(express.json());
app.use(
    session({
        secret:process.env.SESSION_SECRET_KEY, // 세션 암호화 키
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // HTTPS 환경에서는 true로 설정
    })
);

// 라우터 설정
app.use('/posts', postRoutes);
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
