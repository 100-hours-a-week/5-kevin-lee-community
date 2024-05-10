import express from "express"
import { getEditProfilePage, getEditPwPage, getLoginPage, getSigninPage } from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.get('/login', getLoginPage);

userRouter.get('/signin', getSigninPage);

userRouter.get('/edit_profile', getEditProfilePage);

userRouter.get('/edit_pw', getEditPwPage);

export default userRouter