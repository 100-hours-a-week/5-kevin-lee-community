const express = require("express");
const path  = require("path");
const userModelPath = path.join(__dirname, "..","models", "userModel");
const UserModel = require(userModelPath);
const userRoutes = express.Router();


userRoutes.post('/login', (req, res) => {
    const userModel = new UserModel();
    const email = req.body.email;
    const password = req.body.password;

    console.log(email, password);

    
    const rst = userModel.authenticate(email, password);

    /**
     * 스위치 문에 break 혹은 return 이 빠져 있어서 추가했습니다.
     */
    switch(rst[0]){
        case 200:
            res.status(200).send({"message": "login_success", "data" : rst[1]})
            break;
        case 400:
            // 동등 연산자를 사용하셔야 합니다.
            if(rst[1] === "email"){
                res.status(400).send({"message": "required_email", "data" : null});
            }else if(rst[1] == "password"){
                res.status(400).send({"message": "required_password", "data" : null});
            }
            break;
        case 401:
            if(rst[1] == "invalid_email"){
                res.status(401).send({"message": "invalid_email", "data" : null});
            }else{
                res.status(401).send({"message": "invalid_password", "data" : null});
            }
            break;
        default:
            res.status(500).send({"message": "internal_server_error", "data" : null});
            break;
    }
})

module.exports = userRoutes;