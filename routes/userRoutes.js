import express from 'express'
import {loginUser,registerUser,ResetPassword} from '../controller/userController.js'

const userRoute =express.Router();

userRoute.post('/register',registerUser)
userRoute.post('/login',loginUser)
userRoute.post('/reset',ResetPassword)

export default userRoute;