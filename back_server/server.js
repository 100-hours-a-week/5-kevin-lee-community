const express = require("express");
const path = require("path");
const cors = require("cors");
const userRoutesPath = path.join(__dirname, 'routes', 'userRoutes.js');
const userRoutes = require(userRoutesPath);
const app = express();
const PORT = process.env.PORT || 4000

app.use(cors({
    origin:'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true //쿠키 설정 허용
}
))
app.use(express.urlencoded({extended:true}));

app.use('/users', userRoutes);    


app.listen(PORT, () => {
    console.log(`서버 포트 ${PORT}에서 실행 중입니다.`);
});

