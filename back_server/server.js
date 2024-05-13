import express from "express"
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 4000

try{
    app.use(cors({
        origin:'http://localhost:3000',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true //쿠키 설정 허용
    }
    ))
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/users', userRoutes);    
}
catch(e){
    res.status(500).send({"message": "internal_server_error", "data" : null});
}

app.listen(PORT, () => {
    console.log(`서버 포트 ${PORT}에서 실행 중입니다.`);
});

