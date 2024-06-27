const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require('express-session');

const postRoutesPath = path.join(__dirname, 'routes', 'postRoutes.js');
const userRoutesPath = path.join(__dirname, 'routes', 'userRoutes.js');
const commentRoutesPath = path.join(__dirname, 'routes', 'commentRoutes.js');

const userRoutes = require(userRoutesPath);
const postRoutes = require(postRoutesPath);
const commentRoutes = require(commentRoutesPath);

const app = express();
const PORT = process.env.PORT || 4000

const corsOptions = {
    origin: 'http://localhost:3000', // 프론트엔드 도메인
    credentials: true, // 쿠키를 포함한 요청을 허용
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secreteIsNotScret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,  // 개발 단계에서는 false, 프로덕션에서는 true로 설정
        httpOnly: true, // JavaScript로 쿠키 접근 방지
        sameSite: 'strict' // 크로스 사이트 요청 방지
    }
}));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.listen(PORT, () => {
    console.log(`서버 포트 ${PORT}에서 실행 중입니다.`);
});
