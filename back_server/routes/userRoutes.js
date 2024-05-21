const express = require("express");
const path  = require("path");
const userModelPath = path.join(__dirname, "..","models", "UserModel");
const userControllerPath = path.join(__dirname, "..","controllers", "UserController")
const UserController = require(userControllerPath);
const UserModel = require(userModelPath);
const userRoutes = express.Router();


userRoutes.post('/login', (req, res) => {
    const userModel = new UserModel();
    const email = req.body.email;
    const password = req.body.password;
    
    const rst = userModel.loginAuth(email, password);

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
});

userRoutes.post("/signup", (req, res) => {
    const userModel = new UserModel();

    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const img_file = req.body.img_file;


    const rst = userModel.signinAuth(email, password, nickname, img_file);

    switch(rst[0]){
        case 201:
            res.status(201).send({"message" : "register_success", "data" : rst[1]});
            break;
        case 400:
            if(rst[1] == "invalid_email"){
                res.status(400).send({"message" : "invalid email" , "data" : null});
            }else if(rst[1] == "invalid_password"){
                res.status(400).send({"message" : "invalid password" , "data" : null});
            }else if(rst[1] == "invalid_nickname"){
                res.status(400).send({"message" : "invalid nickname" , "data" : null});
            }
            break;
        default:
            res.status(500).send({"message" : "internel server error" , "data" : null});
            break;
    }
});

// 이메일 중복 체크
userRoutes.get('/email/check', (req, res) => {
    const userModel = new UserModel();
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ status: 400, message: 'invalid_email' });
    }

    const user = userModel.users.find(user => user.email === email);
    if (user) {
        return res.status(400).json({ status: 400, message: 'already_exist_email' });
    } else {
        return res.status(200).json({ status: 200, message: 'available_email' });
    }
});

// 닉네임 중복 체크
userRoutes.get('/nickname/check', (req, res) => {
    const userModel = new UserModel();
    const nickname = req.query.nickname;

    if (!nickname) {
        return res.status(400).json({ status: 400, message: 'invalid_nickname' });
    }

    const user = userModel.users.find(user => user.nickname === nickname);
    if (user) {
        return res.status(400).json({ status: 400, message: 'already_exist_nickname' });
    } else {
        return res.status(200).json({ status: 200, message: 'available_nickname' });
    }
});

userRoutes.get('/:user_id', UserController.getUserById);

userRoutes.patch('/:user_id', UserController.updateUser);

userRoutes.patch("/:user_id/password", UserController.changePassword);

userRoutes.delete('/:user_id', UserController.deleteUser);

module.exports = userRoutes;