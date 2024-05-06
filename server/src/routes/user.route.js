import { Router } from "express";
import { loginUser, logOutUser, registerUser } from "../controllers/user.controller.js";
import { veriftJWT } from "../middlewares/auth.middleware.js";
import { getBlogs } from "../controllers/blog.controller.js";
const router =  Router()

// register
router.route("/register").post(registerUser)
// login
router.route("/login").post(loginUser)
// logout
router.route("/logout").get(veriftJWT,logOutUser)
// update profile
// update password
// update profile image - one middleware
// forget password  -- no middleware 
// create a new password  -- verify otp , create new password
// refresh access token - refreshJWT middleware 
// user blogs
router.route('/blogs').get(veriftJWT, getBlogs)

// user profile

export default router