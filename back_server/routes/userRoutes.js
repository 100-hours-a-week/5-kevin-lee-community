const express = require("express");
const path  = require("path");
const userModelPath = path.join(__dirname, "..","models", "UserModel");
const userControllerPath = path.join(__dirname, "..","controllers", "UserController")
const UserController = require(userControllerPath);
const UserModel = require(userModelPath);
const userRoutes = express.Router();


// userRoutes.post('/login', async (req, res) => {
//     try {
//         const userModel = new UserModel();
//         const email = req.body.email;
//         const password = req.body.password;
        
//         const rst = await userModel.loginAuth(email, password);

//         switch (rst[0]) {
//             case 200:
//                 res.status(200).send({ "message": "login_success", "data": rst[1] });
//                 break;
//             case 400:
//                 if (rst[1] === "email") {
//                     res.status(400).send({ "message": "required_email", "data": null });
//                 } else if (rst[1] === "password") {
//                     res.status(400).send({ "message": "required_password", "data": null });
//                 }
//                 break;
//             case 401:
//                 if (rst[1] === "invalid_email") {
//                     res.status(401).send({ "message": "invalid_email", "data": null });
//                 } else {
//                     res.status(401).send({ "message": "invalid_password", "data": null });
//                 }
//                 break;
//             default:
//                 res.status(500).send({ "message": "internal_server_error", "data": null });
//                 break;
//         }
//     } catch (error) {
//         console.error('Route error:', error);
//         res.status(500).send({ "message": "internal_server_error", "data": null });
//     }
// });

// userRoutes.post("/signup", (req, res) => {
//     const userModel = new UserModel();

//     const email = req.body.email;
//     const password = req.body.password;
//     const nickname = req.body.nickname;
//     const img_file = req.body.img_file;


//     const rst = userModel.signinAuth(email, password, nickname, img_file);

//     switch(rst[0]){
//         case 201:
//             res.status(201).send({"message" : "register_success", "data" : rst[1]});
//             break;
//         case 400:
//             if(rst[1] == "invalid_email"){
//                 res.status(400).send({"message" : "invalid email" , "data" : null});
//             }else if(rst[1] == "invalid_password"){
//                 res.status(400).send({"message" : "invalid password" , "data" : null});
//             }else if(rst[1] == "invalid_nickname"){
//                 res.status(400).send({"message" : "invalid nickname" , "data" : null});
//             }
//             break;
//         default:
//             res.status(500).send({"message" : "internel server error" , "data" : null});
//             break;
//     }
// });

userRoutes.post('/login', UserController.login);

userRoutes.post('/signup', UserController.signup);

userRoutes.get('/email/check', UserController.checkEmail);

// 닉네임 중복 체크
userRoutes.get('/nickname/check', UserController.checkNickname);



userRoutes.get('/profile', UserController.getUserById);

userRoutes.patch('/profile', UserController.updateUser);

userRoutes.patch("/profile/password", UserController.changePassword);

userRoutes.delete('/profile', UserController.deleteUser);

module.exports = userRoutes;