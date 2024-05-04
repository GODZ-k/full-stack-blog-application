import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
const router =  Router()

router.route("/register").post(registerUser)
// login
// logout
// update profile
// update password
// update profile image - one middleware
// forget password  -- no middleware 
// create a new password  -- verify otp , create new password
// refresh access token - refreshJWT middleware 

export default router