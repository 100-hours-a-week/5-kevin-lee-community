import express from "express"

const app = express();
const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log(`서버 포트 ${PORT}에서 실행 중입니다.`);
});

