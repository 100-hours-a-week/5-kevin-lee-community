import express from "express"
import UserModel from "../models/UserModel.js";

const userRoutes = express.Router();

userRoutes.post('/login', (req, res) => {
    const {username, password} = req.body;
    const userModel = new UserModel();
    const rst = userModel.authenticate(username, password);
    console.log(rst[0]);

    /**
     * 스위치 문에 break 혹은 return 이 빠져 있어서 추가했습니다.
     */
    switch(rst[0]){
        case 200:
            res.status(200).send({"message": "login_success", "data" : rst[1]})
            break;
        case 400:
            if(rst[1] == "email"){
                res.status(400).send({"message": "required_email", "data" : null});
            }else{
                res.status(400).send({"message": "required_password", "data" : null});
            }
            break;
        case 401:
            if(rst[1] == "email"){
                res.status(401).send({"message": "invalid_email", "data" : null});
            } else {
                res.status(401).send({"message": "invalid_password", "data" : null});
            }
            break;
        default:
            res.status(500).send({"message": "internal_server_error", "data" : null});
    }
})

export default userRoutes;